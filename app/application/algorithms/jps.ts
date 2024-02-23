"use client";

import heuristicEuclidean from "./euclidean";
import isDiagonal from "./isdiagonal";
import PriorityQueue from "./pq";

// jps is a special A* algorithm.

export default function jumpPointSearch(
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

function inBoundsAndNotTile(
	x: number,
	y: number,
	width: number,
	fieldStatus: number[]
) {
	// check if it's within bounds
	if (x < 0 || x >= width || y < 0 || y * width >= fieldStatus.length) {
		return false;
	}

	if (fieldStatus[y * width + x] === 1) {
		return false;
	}

	return true;
}

function isCorrectMove(
	parent: number,
	x: number,
	y: number,
	dx: number,
	dy: number,
	width: number,
	fieldStatus: number[]
) {
	// check if it's within bounds
	if (!inBoundsAndNotTile(x, y, width, fieldStatus)) {
		return false;
	}

	// handle diagonals
	if (dx !== 0 && dy !== 0) {
		if (
			fieldStatus[parent + dx] === 1 &&
			fieldStatus[parent + width * dy] === 1
		) {
			return false;
		}
	}

	return true;
}

function pruneNeighbors(
	target: number,
	targetX: number,
	targetY: number,
	dx: number,
	dy: number,
	width: number,
	fieldStatus: number[]
) {
	if (dx !== 0 && dy === 0) {
		if (0 <= targetX + dx && targetX + dx < width) {
			if (targetY > 0 && fieldStatus[target - width] === 1) {
				return target;
			}

			if (
				targetY < fieldStatus.length / width &&
				fieldStatus[target + width] === 1
			) {
				return target;
			}
		} else {
			return target;
		}

		return pruneNeighbors(
			target + dx,
			targetX + dx,
			targetY,
			dx,
			dy,
			width,
			fieldStatus
		);
	} else if (dx === 0 && dy !== 0) {
		if (0 <= targetY + dy && targetY + dy < fieldStatus.length / width) {
			if (targetX > 0 && fieldStatus[target - 1] === 1) {
				return target;
			}

			if (targetX < width - 1 && fieldStatus[target + 1] === 1) {
				return target;
			}
		} else {
			return target;
		}

		return pruneNeighbors(
			target + dy * width,
			targetX,
			targetY + dy,
			dx,
			dy,
			width,
			fieldStatus
		);
	}
}

// JUMP POINT SEARCH LOGIC:

function jump(
	parent: number,
	dx: number,
	dy: number,
	width: number,
	fieldStatus: number[]
) {
	const x = (parent % width) + dx;
	const y = Math.floor(parent / width) + dy;

	if (!isCorrectMove(parent, x, y, dx, dy, width, fieldStatus)) {
		return null;
	}

	const target = x + y * width;

	return pruneNeighbors(target, x, y, dx, dy, width, fieldStatus);
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

		if (neighbor !== null && neighbor !== undefined) {
			neighbors.push(neighbor);
		}
	}

	return neighbors;
}
