"use client";

import heuristicEuclidean from "./euclidean";
import isDiagonal from "./isdiagonal";
import PriorityQueue from "./pq";

export default function aStar(
	adjacencyList: Record<number, number[]>,
	startNode: number,
	endNode: number,
	width: number
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

		// we've reached the goal
		if (current === endNode) {
			return {
				shortestPath: reconstructPath(cameFrom, endNode),
				visited: visited,
				absoluteDistance: parseFloat(
					(gScore[endNode] + Number.EPSILON).toFixed(1)
				),
			};
		}

		// neighbor processing
		for (const neighbor of adjacencyList[current]) {
			let tentativeGScore = gScore[current] + 1;

			if (isDiagonal(current, neighbor, width)) {
				tentativeGScore = gScore[current] + Math.sqrt(2);
			}

			// use the newly found better path if distance is less or neighbor does not exist already
			if (
				!gScore.hasOwnProperty(neighbor) ||
				tentativeGScore < gScore[neighbor]
			) {
				cameFrom[neighbor] = current;

				gScore[neighbor] = tentativeGScore;

				// heuristic approximation
				fScore[neighbor] =
					tentativeGScore +
					Math.floor(heuristicEuclidean(neighbor, endNode, width) * 1000) /
						1000;

				// openSet needs reordering if a better path is found
				if (openSet.contains(neighbor)) {
					openSet.decreasePriority(neighbor, fScore[neighbor]);
					openSet.bubbleUp(openSet.findIndex(neighbor));
				} else {
					openSet.enqueue(neighbor, fScore[neighbor]);
				}
			}
		}

		visited[current] = true;
	}

	// pq empty but no path found
	return { visited: visited };
}

// helper function to reconstruct the shortest found path
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
