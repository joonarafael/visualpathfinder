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
				absoluteDistance: "null",
			};
		}

		// UNDER CONSTRUCTION

		for (const neighbor of getNeighbors(current, width, fieldStatus)) {
			let tentativeGScore = gScore[current] + 1;

			if (isDiagonal(current, neighbor, width)) {
				tentativeGScore = gScore[current] + Math.sqrt(2);
			}

			if (neighbor !== null) {
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

// JUMP POINT SEARCH LOGIC:

function jump(
	node: number,
	dx: number,
	dy: number,
	width: number,
	fieldStatus: number[]
) {
	const x = (node % width) + dx;
	const y = Math.floor(node / width) + dy;

	// check if it's within bounds
	if (x < 0 || x >= width || y < 0 || y * width >= fieldStatus.length) {
		return null;
	}

	// handle diagonals
	if (dx !== 0 && dy !== 0) {
		if (fieldStatus[node + dx] === 1 && fieldStatus[node + width * dy] === 1) {
			return null;
		}
	}

	// check if the potential neighbor is an obstacle
	if (fieldStatus[node] === 1) {
		return null;
	}

	return x + y * width;
}

function getNeighbors(node: number, width: number, fieldStatus: number[]) {
	let neighbors = [];

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
		const x = direction[0];
		const y = direction[1];

		const neighbor = jump(node, x, y, width, fieldStatus);

		if (neighbor !== null) {
			neighbors.push(neighbor);
		}
	}

	return neighbors;
}
