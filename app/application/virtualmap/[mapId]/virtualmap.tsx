"use client";

import PageError from "@/app/components/pageerror";
import { useEffect, useState } from "react";
import Preview from "./preview";
import { Button } from "@/app/components/ui/button";
import generateAdjacencyList from "../../algorithms/generateadjacencylist";
import dijkstra from "../../algorithms/dijkstra";
import aStar from "../../algorithms/astar";
import jps from "../../algorithms/jps";
import ResultElement from "../../running/resultelement";
import NotRunElement from "../../running/notrunelement";
import heuristicEuclidean from "../../algorithms/euclidean";

type AdjacencyList = Record<number, number[]>;

interface VirtualMapProps {
	map: number[];
	width: number;
	height: number;
}

const VirtualMap: React.FC<VirtualMapProps> = ({ map, width, height }) => {
	const [windowWidth, setWindowWidth] = useState(window.innerWidth);
	const [isError, setIsError] = useState(false);
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

	const details = {
		width: width,
		height: height,
		size: map.length,
		nodes: [...map].filter((x) => x == 0).length,
	};

	const [points, setPoints] = useState({
		start: -1,
		end: -1,
		distance: -1,
	});

	// eventlistener for the window resizing
	useEffect(() => {
		const handleResizeWindow = () => setWindowWidth(window.innerWidth);
		window.addEventListener("resize", handleResizeWindow);

		return () => {
			window.removeEventListener("resize", handleResizeWindow);
		};
	}, []);

	const breakpoint = 1048;

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

	const runAlgorithm = (tmp: number[], start: number, finish: number) => {
		try {
			const adjacencyList = generateAdjacencyList(tmp, width);

			let startTime = performance.now();

			const dijkstraReturn = dijkstra(adjacencyList, start, finish, width);

			let endTime = performance.now();

			const dijkstraCount: number = Object.values(
				dijkstraReturn.visited
			).reduce((count, value) => count + (value ? 1 : 0), 0);

			const dijkstraTime = parseFloat(
				(endTime - startTime + Number.EPSILON).toFixed(1)
			);

			startTime = performance.now();

			const aStarReturn = aStar(adjacencyList, start, finish, width);

			endTime = performance.now();

			const aStarCount: number = Object.values(aStarReturn.visited).reduce(
				(count, value) => count + (value ? 1 : 0),
				0
			);

			const aStarTime = parseFloat(
				(endTime - startTime + Number.EPSILON).toFixed(1)
			);

			startTime = performance.now();

			const jpsReturn = jps(adjacencyList, start, finish, width, tmp);

			endTime = performance.now();

			const jpsCount: number = Object.values(jpsReturn.visited).reduce(
				(count, value) => count + (value ? 1 : 0),
				0
			);

			const jpsTime = parseFloat(
				(endTime - startTime + Number.EPSILON).toFixed(1)
			);

			setRunsStats({
				dijkstra: {
					time: dijkstraTime,
					visited_nodes: dijkstraCount,
					path_length: dijkstraReturn?.shortestPath
						? `${dijkstraReturn.shortestPath.length} (${dijkstraReturn?.absoluteDistance})`
						: "0",
				},
				a_star: {
					time: aStarTime,
					visited_nodes: aStarCount,
					path_length: aStarReturn?.shortestPath
						? `${aStarReturn.shortestPath.length} (${aStarReturn?.absoluteDistance})`
						: "0",
				},
				jps: {
					time: jpsTime,
					visited_nodes: jpsCount,
					path_length: jpsReturn?.shortestPath
						? `${jpsReturn.shortestPath.length} (${jpsReturn?.absoluteDistance})`
						: "0",
				},
			});
		} catch (e) {
			console.error(e);
			setIsError(true);
			return;
		}
	};

	const runOnce = () => {
		const tmp = [...map];

		let start = Math.floor(Math.random() * (map.length - 1));
		let finish = Math.floor(Math.random() * (map.length - 1));

		while (tmp[start] === 1) {
			start = Math.floor(Math.random() * (map.length - 1));
		}

		while (tmp[finish] === 1) {
			finish = Math.floor(Math.random() * (map.length - 1));
		}

		while (start === finish) {
			finish = Math.floor(Math.random() * (map.length - 1));
		}

		tmp[start] = 2;
		tmp[finish] = 3;

		setPoints({
			start: start,
			end: finish,
			distance: parseFloat(
				(heuristicEuclidean(start, finish, width) + Number.EPSILON).toFixed(1)
			),
		});

		runAlgorithm(tmp, start, finish);
	};

	// viewport too narrow
	if (windowWidth < breakpoint) {
		return <PageError message={"Please increase window width to 1048px."} />;
	}

	return (
		<div className="flex flex-col gap-4">
			<div className="border rounded-lg h-[60svh] overflow-scroll">
				<Preview map={map} width={width} height={height} />
			</div>
			<div className="border rounded-lg h-full p-2">
				MAP SIZE: {details.size}, where WIDTH: {details.width} and HEIGHT:{" "}
				{details.height}. TOTAL WALL TILES: {details.size - details.nodes} and
				PATH TILES: {details.nodes}.<br />
				{points.start >= 0 && points.end >= 0 && (
					<>{`START POINT at ${points.start} and END at ${points.end} with an ABSOLUTE DISTANCE of ${points.distance}.`}</>
				)}
			</div>
			<div className="border rounded-lg h-full grid grid-cols-5 p-2 gap-2">
				<Button
					className="h-full w-full font-light"
					variant={"secondary"}
					onClick={() => {
						runOnce();
					}}
				>
					RUN ONCE
				</Button>
				{runsStats.dijkstra.visited_nodes > 0 ? (
					<ResultElement
						name={"dijkstra"}
						data={{
							time: runsStats.dijkstra.time,
							visited_nodes: runsStats.dijkstra.visited_nodes,
							path_length: runsStats.dijkstra.path_length,
						}}
					/>
				) : (
					<NotRunElement name="dijkstra" />
				)}
				{runsStats.a_star.visited_nodes > 0 ? (
					<ResultElement
						name={"a*"}
						data={{
							time: runsStats.a_star.time,
							visited_nodes: runsStats.a_star.visited_nodes,
							path_length: runsStats.a_star.path_length,
						}}
					/>
				) : (
					<NotRunElement name="a*" />
				)}
				{runsStats.jps.visited_nodes > 0 ? (
					<ResultElement
						name={"jps"}
						data={{
							time: runsStats.jps.time,
							visited_nodes: runsStats.jps.visited_nodes,
							path_length: runsStats.jps.path_length,
						}}
					/>
				) : (
					<NotRunElement name="jps" />
				)}
			</div>
		</div>
	);
};

export default VirtualMap;
