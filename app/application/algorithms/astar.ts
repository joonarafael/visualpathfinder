"use client";

import heuristicManhattan from "./manhattan";
import PriorityQueue from "./pq";

export default function aStar(
	adjacencyList: Record<number, number[]>,
	startNode: number,
	endNode: number,
	width: number
) {
	const openSet = new PriorityQueue<number>(); // this is the priority queue
	const cameFrom: Record<number, number> = {}; // record of navigated nodes
	const gScore: Record<number, number> = {}; // cost from start along best known path
	const fScore: Record<number, number> = {}; // estimated total cost from start to goal THROUGH y (neighbor evaluation)

	const visited: { [node: number]: boolean } = {};

	openSet.enqueue(startNode, 0);

	gScore[startNode] = 0;
	fScore[startNode] = heuristicManhattan(startNode, endNode, width);

	// execute algorithm as long as there are nodes in the priority queue
	while (!openSet.isEmpty()) {
		const current = openSet.dequeue();

		if (current === undefined) {
			break;
		}

		visited[current] = true;

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

		for (const neighbor of adjacencyList[current]) {
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
					tentativeGScore + heuristicManhattan(neighbor, endNode, width);

				if (!openSet.queue.some((item) => item.element === neighbor)) {
					openSet.enqueue(neighbor, fScore[neighbor]);
				}
			}
		}
	}

	// pq empty but no path found
	return { visited: visited };
}

function isDiagonal(node: number, neighbor: number, width: number): boolean {
	if (Math.abs(node - neighbor) === width) {
		return false;
	}

	if (Math.abs(node - neighbor) === 1) {
		return false;
	}

	return true;
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
