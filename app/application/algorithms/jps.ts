"use client";

import heuristicEuclidean from "./euclidean";
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
				absoluteDistance: "null",
			};
		}

		// UNDER CONSTRUCTION

		for (const neighbor of getNeighborsWithJumpPoints(
			current,
			adjacencyList,
			width,
			fieldStatus
		)) {
			const tentativeGScore =
				gScore[current] + heuristicEuclidean(current, neighbor, width);

			if (
				!gScore.hasOwnProperty(neighbor) ||
				tentativeGScore < gScore[neighbor]
			) {
				cameFrom[neighbor] = current;

				gScore[neighbor] = tentativeGScore;
				fScore[neighbor] =
					tentativeGScore + heuristicEuclidean(neighbor, endNode, width);

				if (!openSet.heap.some((item) => item.element === neighbor)) {
					openSet.enqueue(neighbor, fScore[neighbor]);
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
		const upper = target - width;
		const lower = target + width;

		let forcedNeighbors: number[] = [];

		if (upper > 0 && !adjacencyList[target].includes(upper)) {
			if (adjacencyList[target].includes(upper + dx)) {
				forcedNeighbors.push(upper + dx);
			}
		}

		if (lower < fieldStatus.length && !adjacencyList[target].includes(lower)) {
			if (adjacencyList[target].includes(lower + dx)) {
				forcedNeighbors.push(lower + dx);
			}
		}

		const next = target + dx;

		if (!adjacencyList[target].includes(next)) {
			return target;
		} else if (forcedNeighbors.length > 0) {
			forcedNeighbors.push(next);

			return forcedNeighbors;
		} else {
			// continue jump
			return jump(target, dx, dy, adjacencyList, width, fieldStatus);
		}
	}

	// y movement todo
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
		return target;
	}

	// straight moves
	if (dx === 0 || dy === 0) {
		return pruneStraightDirectionNeighbors(
			target,
			dx,
			dy,
			adjacencyList,
			width,
			fieldStatus
		);
	}

	// diagonal moves todo
}

function getNeighborsWithJumpPoints(
	parent: number,
	adjacencyList: Record<number, number[]>,
	width: number,
	fieldStatus: number[]
) {
	let neighbors: number[] = [];

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
			if (typeof neighbor === "number") {
				neighbors.push(neighbor);
			} else {
				neighbors = neighbors.concat(neighbor);
			}
		}
	}

	console.log(parent, neighbors);

	return neighbors;
}
