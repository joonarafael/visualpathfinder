"use client";

// Core Web Application Logic.
// All core features are provided by this element.
// Data structures for grid state and other variables are initialized and stored here.
// It's quite a mess.

import { useEffect, useState } from "react";
import { toast } from "sonner";

import Container from "../components/container";
import PageError from "../components/pageerror";
import aStar from "./algorithms/astar";
import dijkstra from "./algorithms/dijkstra";
import jumpPointSearch from "./algorithms/jps";
import generateAdjacencyList from "./algorithms/generateadjacencylist";
import Matrix from "./drawing/matrix";
import ToolBar from "./drawing/toolbar";
import Menu from "./menu";
import RunMatrix from "./running/matrix";
import RunBar from "./running/runbar";
import updateUserView from "./running/updateuserview";
import updateJPSPath from "./running/updatejpspath";
import buildJPSPath from "./running/buildjpspath";

type AdjacencyList = Record<number, number[]>;

const WIDTH = 72;
const HEIGHT = 48;

const PathFinder = () => {
	// initialize all state variables
	const [windowWidth, setWindowWidth] = useState(window.innerWidth);
	const [isError, setIsError] = useState(false);
	const [smoothing, setSmoothing] = useState(true);
	const [contrast, setContrast] = useState(false);
	const [indexing, setIndexing] = useState(false);
	const [mapChanged, setMapChanged] = useState(false);
	const [zoom, setZoom] = useState(4);
	const [tool, setTool] = useState("START");
	const [showNote, setShowNote] = useState(0);
	const [applicationState, setApplicationState] = useState("draw");
	const [algorithm, setAlgorithm] = useState("dijkstra");
	const [runsStats, setRunsStats] = useState({
		dijkstra: {
			time: 0,
			visited_nodes: 0,
			path_length: "0",
		},
		a_star: {
			time: 0,
			visited_nodes: 0,
			path_length: "0",
		},
		jps: {
			time: 0,
			visited_nodes: 0,
			path_length: "0",
		},
	});

	// initialize field
	const field = Array.from({ length: WIDTH * HEIGHT }, (_, index) => index);
	const [fieldStatus, setFieldStatus] = useState(
		Array.from({ length: WIDTH * HEIGHT }, (_, index) => 0)
	);
	const [runFieldStatus, setRunFieldStatus] = useState(
		Array.from({ length: WIDTH * HEIGHT }, (_, index) => 0)
	);

	// eventlistener for the window resizing
	useEffect(() => {
		const handleResizeWindow = () => setWindowWidth(window.innerWidth);
		window.addEventListener("resize", handleResizeWindow);

		return () => {
			window.removeEventListener("resize", handleResizeWindow);
		};
	}, []);

	const breakpoint = 1048;

	// if map is changed, the old stats will be reset after an algorithm run
	useEffect(() => {
		setMapChanged(true);
	}, [fieldStatus]);

	// if any unexpected runtime errors are encountered, render the error page
	if (isError) {
		return (
			<PageError
				message={
					"Encountered an unrecoverable fatal error during algorithm execution. Page reload required."
				}
			/>
		);
	}

	// handle grid tile clicking
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

		return dijkstra(adjacencyList, start, finish, WIDTH);
	};

	const callAStar = (
		adjacencyList: AdjacencyList,
		start: number,
		finish: number
	) => {
		setAlgorithm("a*");

		return aStar(adjacencyList, start, finish, WIDTH);
	};

	const callJPS = (
		adjacencyList: AdjacencyList,
		start: number,
		finish: number
	) => {
		setAlgorithm("jps");

		return jumpPointSearch(adjacencyList, start, finish, WIDTH, fieldStatus);
	};

	// function to handle the pathfinding calls (for all algorithms)
	const runAlgorithm = (algorithm: string) => {
		if (startAndFinishExist()) {
			const tmp = [...fieldStatus];
			setRunFieldStatus(tmp);
			setApplicationState("run");

			const start = tmp.indexOf(2);
			const finish = tmp.indexOf(3);

			try {
				const adjacencyList = generateAdjacencyList(tmp, WIDTH);

				let algorithmReturn;

				const startTime = performance.now();

				if (algorithm === "dijkstra") {
					algorithmReturn = callDijkstra(adjacencyList, start, finish);
				} else if (algorithm === "a_star") {
					algorithmReturn = callAStar(adjacencyList, start, finish);
				} else {
					algorithmReturn = callJPS(adjacencyList, start, finish);
				}

				const endTime = performance.now();

				const trueCount: number = Object.values(algorithmReturn.visited).reduce(
					(count, value) => count + (value ? 1 : 0),
					0
				);

				const elapsedTime = parseFloat(
					(endTime - startTime + Number.EPSILON).toFixed(1)
				);

				// update and/or reset statistics depending on the algorithm and map change
				const dijkstraStats =
					algorithm === "dijkstra"
						? {
								time: elapsedTime,
								visited_nodes: trueCount,
								path_length: algorithmReturn?.shortestPath
									? `${algorithmReturn.shortestPath.length} (${algorithmReturn?.absoluteDistance})`
									: "0",
						  }
						: mapChanged
						? {
								time: 0,
								visited_nodes: 0,
								path_length: "0",
						  }
						: {
								time: runsStats.dijkstra.time,
								visited_nodes: runsStats.dijkstra.visited_nodes,
								path_length: runsStats.dijkstra.path_length,
						  };

				const aStarStats =
					algorithm === "a_star"
						? {
								time: elapsedTime,
								visited_nodes: trueCount,
								path_length: algorithmReturn?.shortestPath
									? `${algorithmReturn.shortestPath.length} (${algorithmReturn?.absoluteDistance})`
									: "0",
						  }
						: mapChanged
						? {
								time: 0,
								visited_nodes: 0,
								path_length: "0",
						  }
						: {
								time: runsStats.a_star.time,
								visited_nodes: runsStats.a_star.visited_nodes,
								path_length: runsStats.a_star.path_length,
						  };

				const jpsStats =
					algorithm === "jps"
						? {
								time: elapsedTime,
								visited_nodes: trueCount,
								path_length: algorithmReturn?.shortestPath
									? `${algorithmReturn.shortestPath.length} (${algorithmReturn?.absoluteDistance})`
									: "0",
						  }
						: mapChanged
						? {
								time: 0,
								visited_nodes: 0,
								path_length: "0",
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

				// request full path drawing for JPS
				if (algorithm === "jps") {
					const fullJPSPath = buildJPSPath(WIDTH, algorithmReturn.shortestPath);

					updateJPSPath(
						tmp,
						setRunFieldStatus,
						algorithmReturn.visited,
						tmp.indexOf(2),
						tmp.indexOf(3),
						algorithmReturn.shortestPath,
						fullJPSPath
					);
				} else {
					updateUserView(
						tmp,
						setRunFieldStatus,
						algorithmReturn.visited,
						tmp.indexOf(2),
						tmp.indexOf(3),
						algorithmReturn.shortestPath
					);
				}

				if (mapChanged) {
					setMapChanged(false);
				}
			} catch (e) {
				console.error(e);
				setIsError(true);
				return;
			}
		} else {
			toast("Start and/or Finish missing.");
		}
	};

	// viewport too narrow
	if (windowWidth < breakpoint) {
		return <PageError message={"Please increase window width to 1048px."} />;
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
					fieldStatus={fieldStatus}
					setContrast={setContrast}
					indexing={indexing}
					setIndexing={setIndexing}
				/>
				<div className="flex flex-row gap-4">
					<div className="border rounded-lg w-5/6 h-[80svh] overflow-scroll">
						<div className="w-max">
							{applicationState === "draw" && (
								<Matrix
									width={WIDTH}
									height={46}
									field={field}
									fieldStatus={fieldStatus}
									zoom={zoom}
									tileClick={tileClick}
									smoothing={smoothing}
									contrast={contrast}
									indexing={indexing}
								/>
							)}
							{applicationState === "run" && (
								<RunMatrix
									width={WIDTH}
									height={46}
									field={field}
									fieldStatus={runFieldStatus}
									zoom={zoom}
									smoothing={smoothing}
									contrast={contrast}
									indexing={indexing}
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
