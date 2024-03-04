"use client";

import isDiagonal from "./isdiagonal";
import PriorityQueue from "./pq";

interface DijkstraResult {
	visited: { [node: number]: boolean };
	shortestPath?: number[];
	absoluteDistance?: number;
}

export default function dijkstra(
	adjacencyList: Record<number, number[]>,
	startNode: number,
	endNode: number,
	width: number
): DijkstraResult {
	const openSet = new PriorityQueue<number>();
	const cameFrom: Record<number, number> = {};
	const gScore: Record<number, number> = {};

	const visited: { [node: number]: boolean } = {};

	openSet.enqueue(startNode, 0);

	gScore[startNode] = 0;

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

			if (
				!gScore.hasOwnProperty(neighbor) ||
				tentativeGScore <= gScore[neighbor]
			) {
				cameFrom[neighbor] = current;
				gScore[neighbor] = tentativeGScore;

				// openSet needs reordering if a better path is found
				if (openSet.contains(neighbor)) {
					openSet.decreasePriority(neighbor, gScore[neighbor]);
					openSet.bubbleUp(openSet.findIndex(neighbor));
				} else {
					openSet.enqueue(neighbor, gScore[neighbor]);
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
