"use client";

// Main UI logic is provided by this element.
// Master data structures where grid state and other variables are stored are initialized here.

import { useEffect, useState } from "react";
import { toast } from "sonner";

import Container from "../components/container";
import dijkstra from "./algorithms/dijkstra";
import generateAdjacencyList from "./algorithms/generateadjacencylist";
import Matrix from "./drawing/matrix";
import ToolBar from "./drawing/toolbar";
import Menu from "./menu";
import RunMatrix from "./running/matrix";
import RunBar from "./running/runbar";
import updateUserView from "./running/updateuserview";

const PathFinder = () => {
	const [showNote, setShowNote] = useState(true);
	const [applicationState, setApplicationState] = useState("draw");
	const [algorithm, setAlgorithm] = useState("dijkstra");
	const [runsStats, setRunsStats] = useState({
		dijkstra: {
			time: 0,
			visited_nodes: 0,
		},
		a_star: {
			time: 0,
			visited_nodes: 0,
		},
		jps: {
			time: 0,
			visited_nodes: 0,
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

	const runDijkstra = () => {
		if (startAndFinishExist()) {
			const tmp = [...fieldStatus];
			console.log(tmp);
			setRunFieldStatus(tmp);
			setAlgorithm("dijkstra");
			setApplicationState("run");

			const startTime = performance.now();

			const adjacencyList = generateAdjacencyList(tmp, 72);
			const dijkstraReturn = dijkstra(
				adjacencyList,
				tmp.indexOf(2),
				tmp.indexOf(3)
			);

			const endTime = performance.now();

			const trueCount: number = Object.values(dijkstraReturn.visited).reduce(
				(count, value) => count + (value ? 1 : 0),
				0
			);

			setRunsStats({
				dijkstra: {
					time: Math.round((endTime - startTime + Number.EPSILON) * 100) / 100,
					visited_nodes: trueCount,
				},
				a_star: {
					time: runsStats.a_star.time,
					visited_nodes: runsStats.a_star.visited_nodes,
				},
				jps: {
					time: runsStats.jps.time,
					visited_nodes: runsStats.jps.visited_nodes,
				},
			});

			updateUserView(
				tmp,
				setRunFieldStatus,
				dijkstraReturn.visited,
				tmp.indexOf(2),
				tmp.indexOf(3),
				dijkstraReturn.shortestPath
			);
		} else {
			toast("Start and/or Finish missing.");
		}
	};

	return (
		<Container>
			<div className="flex flex-col gap-4">
				<Menu
					zoom={zoom}
					setZoom={setZoom}
					setFieldStatus={setFieldStatus}
					applicationState={applicationState}
					setApplicationState={setApplicationState}
					dijkstra={runDijkstra}
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
								/>
							)}
							{applicationState === "run" && (
								<RunMatrix
									width={72}
									height={46}
									field={field}
									fieldStatus={runFieldStatus}
									zoom={zoom}
								/>
							)}
						</div>
					</div>
					<div className="border rounded-lg w-1/6">
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
