"use client";

import heuristicManhattan from "./manhattan";
import PriorityQueue from "./pq";

export default function aStar(
	adjacencyList: Record<number, number[]>,
	startNode: number,
	endNode: number,
	width: number
) {
	// initialize all variables for the algorithm
	const openSet = new PriorityQueue<number>();
	const cameFrom: Record<number, number> = {};
	const gScore: Record<number, number> = {};
	const fScore: Record<number, number> = {};

	// same visited track as in Dijkstra, simply just giving the user more information
	const visited: { [node: number]: boolean } = {};

	openSet.enqueue(startNode, 0);
	gScore[startNode] = 0;
	fScore[startNode] = heuristicManhattan(startNode, endNode, width);

	while (!openSet.isEmpty()) {
		const current = openSet.dequeue();

		if (current === undefined) {
			break;
		}

		visited[current] = true;

		if (current === endNode) {
			return {
				shortestPath: reconstructPath(cameFrom, endNode),
				visited: visited,
			};
		}

		for (const neighbor of adjacencyList[current]) {
			const tentativeGScore = gScore[current] + 1;

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

	return { visited: visited }; // No path found
}

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
