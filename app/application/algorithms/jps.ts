"use client";

import heuristicEuclidean from "./euclidean";
import isDiagonal from "./isdiagonal";
import PriorityQueue from "./pq";

// jps is a special A* algorithm.

export default function jumpPointSearch(
	adjacencyList: Record<number, number[]>,
	startNode: number,
	endNode: number,
	width: number,
	fieldStatus: number[]
) {
	const openSet = new PriorityQueue<number>();
	const cameFrom: Record<number, number> = {};
	const gScore: Record<number, number> = {};
	const fScore: Record<number, number> = {};

	const visited: { [node: number]: boolean } = {};

	openSet.enqueue(startNode, 0);

	gScore[startNode] = 0;
	fScore[startNode] = heuristicEuclidean(startNode, endNode, width);

	while (!openSet.isEmpty()) {
		const current = openSet.dequeue();

		if (current === undefined) {
			break;
		}

		if (fieldStatus[current] === 1) {
			continue;
		}

		// we've reached the goal
		if (current === endNode) {
			return {
				shortestPath: reconstructPath(cameFrom, endNode),
				visited: visited,
				absoluteDistance: parseFloat(
					(fScore[endNode] + Number.EPSILON).toFixed(1)
				),
			};
		}

		// UNDER CONSTRUCTION

		const neighbors = getNeighborsWithJumpPoints(
			current,
			adjacencyList,
			width,
			fieldStatus
		);

		const keys: number[] = Object.keys(neighbors).map(Number);

		for (const key of keys) {
			let absoluteDistance: number;

			if (
				neighbors[key] === true ||
				(Math.floor(key / width) !== Math.floor(current / width) &&
					Math.abs(key - current) % width !== 0 &&
					!isDiagonal(current, key, width))
			) {
				const intersection = keys.filter((element) =>
					adjacencyList[key].includes(element)
				);

				absoluteDistance =
					heuristicEuclidean(current, intersection[0], width) +
					heuristicEuclidean(key, intersection[0], width);
			} else {
				absoluteDistance = heuristicEuclidean(current, key, width);
			}

			const tentativeGScore = gScore[current] + absoluteDistance;

			if (!gScore.hasOwnProperty(key) || tentativeGScore < gScore[key]) {
				cameFrom[key] = current;

				gScore[key] = tentativeGScore;
				fScore[key] = tentativeGScore + heuristicEuclidean(key, endNode, width);

				if (!openSet.heap.some((item) => item.element === key)) {
					openSet.enqueue(key, fScore[key]);
				}
			}
		}

		visited[current] = true;
	}

	// pq empty but no path found
	return { visited: visited };
}

// function to reconstruct the shortest found path
function reconstructPath(
	cameFrom: Record<number, number>,
	current: number
): number[] {
	const path = [current];
	while (cameFrom[current] !== undefined) {
		current = cameFrom[current];
		path.unshift(current);
	}
	return path;
}

function pruneStraightDirectionNeighbors(
	target: number, // target master index
	dx: number, // direction x to target
	dy: number, // direction y to target
	adjacencyList: Record<number, number[]>,
	width: number,
	fieldStatus: number[]
): any {
	// x movement
	if (dy === 0) {
		const north = target - width;
		const south = target + width;

		let forcedNeighbors: Record<number, boolean> = {};

		if (north > 0 && !adjacencyList[target].includes(north)) {
			if (adjacencyList[target].includes(north + dx)) {
				forcedNeighbors[north + dx] = true;
			}
		}

		if (south < fieldStatus.length && !adjacencyList[target].includes(south)) {
			if (adjacencyList[target].includes(south + dx)) {
				forcedNeighbors[south + dx] = true;
			}
		}

		const next = target + dx;

		if (!adjacencyList[target].includes(next)) {
			return target;
		} else if (Object.keys(forcedNeighbors).length > 0) {
			forcedNeighbors[next] = false;
			forcedNeighbors[target] = false;

			return forcedNeighbors;
		} else {
			// continue jump
			return jump(target, dx, dy, adjacencyList, width, fieldStatus);
		}
	}

	// y movement
	const west = target - 1;
	const east = target + 1;

	let forcedNeighbors: Record<number, boolean> = {};

	if (
		Math.floor(west / width) === Math.floor(target / width) &&
		!adjacencyList[target].includes(west)
	) {
		if (adjacencyList[target].includes(west + dy * width)) {
			forcedNeighbors[west + dy * width] = true;
		}
	}

	if (
		Math.floor(east / width) === Math.floor(target / width) &&
		!adjacencyList[target].includes(east)
	) {
		if (adjacencyList[target].includes(east + dy * width)) {
			forcedNeighbors[east + dy * width] = true;
		}
	}

	const next = target + dy * width;

	if (!adjacencyList[target].includes(next)) {
		return target;
	} else if (Object.keys(forcedNeighbors).length > 0) {
		forcedNeighbors[next] = false;
		forcedNeighbors[target] = false;

		return forcedNeighbors;
	} else {
		// continue jump
		return jump(target, dx, dy, adjacencyList, width, fieldStatus);
	}
}

function pruneDiagonalNeighbors(
	target: number, // target master index
	dx: number, // direction x to target
	dy: number, // direction y to target
	adjacencyList: Record<number, number[]>,
	width: number,
	fieldStatus: number[]
): any {
	const xBlocker = target - dx;
	const yBlocker = target - dy * width;

	let forcedNeighbor = -1;

	if (
		Math.floor(xBlocker / width) === Math.floor(target / width) &&
		!adjacencyList[target].includes(xBlocker)
	) {
		if (adjacencyList[target].includes(xBlocker + dy * width)) {
			forcedNeighbor = xBlocker + dy * width;
		}
	}

	if (
		yBlocker > 0 &&
		yBlocker < fieldStatus.length &&
		!adjacencyList[target].includes(yBlocker)
	) {
		if (adjacencyList[target].includes(yBlocker + dx)) {
			forcedNeighbor = yBlocker + dx;
		}
	}

	const nextDiagonal = target + dx + dy * width;
	const nextHorizontal = target + dx;
	const nextVertical = target + dy * width;

	let neighbors: Record<number, boolean> = {};
	neighbors[target] = false;

	if (adjacencyList[target].includes(nextDiagonal)) {
		neighbors[nextDiagonal] = false;
	}

	if (adjacencyList[target].includes(nextHorizontal)) {
		neighbors[nextHorizontal] = false;
	}

	if (adjacencyList[target].includes(nextVertical)) {
		neighbors[nextVertical] = false;
	}

	if (forcedNeighbor !== -1) {
		neighbors[forcedNeighbor] = true;
	}

	return neighbors;
}

function jump(
	parent: number, // parent master index
	dx: number, // direction x to target
	dy: number, // direction y to target
	adjacencyList: Record<number, number[]>,
	width: number,
	fieldStatus: number[]
) {
	const target = parent + dx + width * dy;

	if (!adjacencyList[parent].includes(target)) {
		return null;
	}

	if (fieldStatus[target] === 3) {
		let neighbors: Record<number, boolean> = {};
		neighbors[target] = false;
		return neighbors;
	}

	// diagonal moves
	if (dx !== 0 && dy !== 0) {
		return pruneDiagonalNeighbors(
			target,
			dx,
			dy,
			adjacencyList,
			width,
			fieldStatus
		);
	}

	// straight moves
	return pruneStraightDirectionNeighbors(
		target,
		dx,
		dy,
		adjacencyList,
		width,
		fieldStatus
	);
}

function getNeighborsWithJumpPoints(
	parent: number,
	adjacencyList: Record<number, number[]>,
	width: number,
	fieldStatus: number[]
) {
	// forced neighbors are marked with true, natural neighbors as false
	let neighbors: Record<number, boolean> = {};

	const directions = [
		[0, 1],
		[0, -1],
		[1, 0],
		[-1, 0],
		[1, 1],
		[-1, -1],
		[1, -1],
		[-1, 1],
	];

	for (const direction of directions) {
		const dx = direction[0];
		const dy = direction[1];

		const neighbor = jump(parent, dx, dy, adjacencyList, width, fieldStatus);

		if (neighbor !== null && neighbor !== undefined) {
			const keys: number[] = Object.keys(neighbor).map(Number);

			for (const key of keys) {
				neighbors[key] = neighbor[key];
			}
		}
	}

	return neighbors;
}
