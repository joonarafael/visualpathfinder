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

		// we've reached the goal, reconstruct the shortest path and return information of the visited nodes
		if (current === endNode) {
			return {
				shortestPath: reconstructPath(cameFrom, endNode),
				visited: visited,
			};
		}

		// algorithm MAIN STUFF:
		// evaluate every neighbor
		for (const neighbor of adjacencyList[current]) {
			const tentativeGScore = gScore[current] + 1; // tentativeGScore is the cost from start to the neighbor.

			// If the tentative gScore is better than previous ones, we should use it.
			if (
				!gScore.hasOwnProperty(neighbor) ||
				tentativeGScore < gScore[neighbor]
			) {
				cameFrom[neighbor] = current; // record path
				gScore[neighbor] = tentativeGScore; // update the gScore for this node
				fScore[neighbor] =
					tentativeGScore + heuristicManhattan(neighbor, endNode, width); // also calculate the fScore for the neighbor.

				// we decided that the neighbor is a good choice for the path (with the previous if statement)
				// let's add it to the open set if it's not already there
				if (!openSet.queue.some((item) => item.element === neighbor)) {
					openSet.enqueue(neighbor, fScore[neighbor]);
				}
			}
		}
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
