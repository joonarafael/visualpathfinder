"use client";

// Main UI logic is provided by this element.
// Master data structures where grid state and other variables are stored get initialized here.

import { useEffect, useState } from "react";
import { toast } from "sonner";

import Container from "../components/container";
import PageError from "../components/pageerror";
import aStar from "./algorithms/astar";
import dijkstra from "./algorithms/dijkstra";
import generateAdjacencyList from "./algorithms/generateadjacencylist";
import Matrix from "./drawing/matrix";
import ToolBar from "./drawing/toolbar";
import Menu from "./menu";
import RunMatrix from "./running/matrix";
import RunBar from "./running/runbar";
import updateUserView from "./running/updateuserview";

type AdjacencyList = Record<number, number[]>;

const PathFinder = () => {
	const [windowWidth, setWindowWidth] = useState(window.innerWidth);
	const [isError, setIsError] = useState(false);
	const [smoothing, setSmoothing] = useState(true);
	const [contrast, setContrast] = useState(false);
	const [mapChanged, setMapChanged] = useState(false);

	useEffect(() => {
		const handleResizeWindow = () => setWindowWidth(window.innerWidth);
		window.addEventListener("resize", handleResizeWindow);

		return () => {
			window.removeEventListener("resize", handleResizeWindow);
		};
	}, []);

	const breakpoint = 720;

	const [showNote, setShowNote] = useState(0);
	const [applicationState, setApplicationState] = useState("draw");
	const [algorithm, setAlgorithm] = useState("dijkstra");
	const [runsStats, setRunsStats] = useState({
		dijkstra: {
			time: 0,
			visited_nodes: 0,
			path_length: 0,
		},
		a_star: {
			time: 0,
			visited_nodes: 0,
			path_length: 0,
		},
		jps: {
			time: 0,
			visited_nodes: 0,
			path_length: 0,
		},
	});

	const field = Array.from({ length: 72 * 46 }, (_, index) => index);
	const [fieldStatus, setFieldStatus] = useState(
		Array.from({ length: 72 * 46 }, (_, index) => 0)
	);
	const [runFieldStatus, setRunFieldStatus] = useState(
		Array.from({ length: 72 * 46 }, (_, index) => 0)
	);

	const [zoom, setZoom] = useState(4);
	const [tool, setTool] = useState("START");

	useEffect(() => {
		setMapChanged(true);
	}, [fieldStatus]);

	if (isError) {
		return (
			<PageError
				message={
					"Encountered an unrecoverable fatal error during algorithm execution. Page reload required."
				}
			/>
		);
	}

	const tileClick = (index: number) => {
		if (tool === "START") {
			let tmp = [...fieldStatus];

			const prevStart = tmp.indexOf(2);

			if (prevStart !== -1) {
				tmp[prevStart] = 0;
			}

			if (tmp[index] !== 3) {
				tmp[index] = 2;
				setFieldStatus(tmp);
			}
		} else if (tool === "FINISH") {
			let tmp = [...fieldStatus];

			const prevStart = tmp.indexOf(3);

			if (prevStart !== -1) {
				tmp[prevStart] = 0;
			}

			if (tmp[index] !== 2) {
				tmp[index] = 3;
				setFieldStatus(tmp);
			}
		} else if (tool === "ERASER") {
			let tmp = [...fieldStatus];

			if (tmp[index] === 1) {
				tmp[index] = 0;
				setFieldStatus(tmp);
			}
		} else if (tool === "WALL") {
			let tmp = [...fieldStatus];
			if (tmp[index] === 0) {
				tmp[index] = 1;
				setFieldStatus(tmp);
			}
		}
	};

	const startAndFinishExist = () => {
		const start = fieldStatus.indexOf(2);
		const end = fieldStatus.indexOf(3);

		return start !== -1 && end !== -1;
	};

	const callDijkstra = (
		adjacencyList: AdjacencyList,
		start: number,
		finish: number
	) => {
		setAlgorithm("dijkstra");

		return dijkstra(adjacencyList, start, finish);
	};

	const callAStar = (
		adjacencyList: AdjacencyList,
		start: number,
		finish: number
	) => {
		setAlgorithm("a*");

		return aStar(adjacencyList, start, finish, 72);
	};

	const runAlgorithm = (algorithm: string) => {
		if (startAndFinishExist()) {
			const tmp = [...fieldStatus];
			setRunFieldStatus(tmp);
			setApplicationState("run");

			const start = tmp.indexOf(2);
			const finish = tmp.indexOf(3);

			try {
				const startTime = performance.now();

				const adjacencyList = generateAdjacencyList(tmp, 72);

				let algorithmReturn;

				if (algorithm === "dijkstra") {
					algorithmReturn = callDijkstra(adjacencyList, start, finish);
				} else {
					algorithmReturn = callAStar(adjacencyList, start, finish);
				}

				const endTime = performance.now();

				const trueCount: number = Object.values(algorithmReturn.visited).reduce(
					(count, value) => count + (value ? 1 : 0),
					0
				);

				const dijkstraStats =
					algorithm === "dijkstra"
						? {
								time: parseFloat(
									(endTime - startTime + Number.EPSILON).toFixed(1)
								),
								visited_nodes: trueCount,
								path_length: algorithmReturn?.shortestPath
									? algorithmReturn.shortestPath.length
									: 0,
						  }
						: mapChanged
						? {
								time: 0,
								visited_nodes: 0,
								path_length: 0,
						  }
						: {
								time: runsStats.dijkstra.time,
								visited_nodes: runsStats.dijkstra.visited_nodes,
								path_length: runsStats.dijkstra.path_length,
						  };

				const aStarStats =
					algorithm === "a_star"
						? {
								time: parseFloat(
									(endTime - startTime + Number.EPSILON).toFixed(1)
								),
								visited_nodes: trueCount,
								path_length: algorithmReturn?.shortestPath
									? algorithmReturn.shortestPath.length
									: 0,
						  }
						: mapChanged
						? {
								time: 0,
								visited_nodes: 0,
								path_length: 0,
						  }
						: {
								time: runsStats.a_star.time,
								visited_nodes: runsStats.a_star.visited_nodes,
								path_length: runsStats.a_star.path_length,
						  };

				const jpsStats =
					algorithm === "jps"
						? {
								time: parseFloat(
									(endTime - startTime + Number.EPSILON).toFixed(1)
								),
								visited_nodes: trueCount,
								path_length: algorithmReturn?.shortestPath
									? algorithmReturn.shortestPath.length
									: 0,
						  }
						: mapChanged
						? {
								time: 0,
								visited_nodes: 0,
								path_length: 0,
						  }
						: {
								time: runsStats.jps.time,
								visited_nodes: runsStats.jps.visited_nodes,
								path_length: runsStats.jps.path_length,
						  };

				setRunsStats({
					dijkstra: dijkstraStats,
					a_star: aStarStats,
					jps: jpsStats,
				});

				updateUserView(
					tmp,
					setRunFieldStatus,
					algorithmReturn.visited,
					tmp.indexOf(2),
					tmp.indexOf(3),
					algorithmReturn.shortestPath
				);

				if (mapChanged) {
					setMapChanged(false);
				}
			} catch (e) {
				setIsError(true);
				return;
			}
		} else {
			toast("Start and/or Finish missing.");
		}
	};

	if (windowWidth < breakpoint) {
		return <PageError message={"Please increase window width to 720px."} />;
	}

	return (
		<Container>
			<div className="flex flex-col gap-4">
				<Menu
					zoom={zoom}
					setZoom={setZoom}
					setFieldStatus={setFieldStatus}
					applicationState={applicationState}
					setApplicationState={setApplicationState}
					runAlgorithm={runAlgorithm}
					smoothing={smoothing}
					setSmoothing={setSmoothing}
					contrast={contrast}
					setContrast={setContrast}
				/>
				<div className="flex flex-row gap-4">
					<div className="border rounded-lg w-5/6 h-[80svh] overflow-scroll">
						<div className="w-max">
							{applicationState === "draw" && (
								<Matrix
									width={72}
									height={46}
									field={field}
									fieldStatus={fieldStatus}
									zoom={zoom}
									tileClick={tileClick}
									smoothing={smoothing}
									contrast={contrast}
								/>
							)}
							{applicationState === "run" && (
								<RunMatrix
									width={72}
									height={46}
									field={field}
									fieldStatus={runFieldStatus}
									zoom={zoom}
									smoothing={smoothing}
									contrast={contrast}
								/>
							)}
						</div>
					</div>
					<div className="border rounded-lg w-1/6 h-[80svh] overflow-scroll">
						<div className="w-full">
							{applicationState === "draw" ? (
								<ToolBar
									tool={tool}
									setTool={setTool}
									setApplicationState={setApplicationState}
								/>
							) : (
								<RunBar
									runsStats={runsStats}
									showNote={showNote}
									setShowNote={setShowNote}
									algorithm={algorithm}
									setApplicationState={setApplicationState}
								/>
							)}
						</div>
					</div>
				</div>
			</div>
		</Container>
	);
};

export default PathFinder;
