"use client";

import heuristicManhattan from "./manhattan";
import PriorityQueue from "./pq";

export default function jumpPointSearch(
	adjacencyList: Record<number, number[]>,
	startNode: number,
	endNode: number,
	width: number,
	fieldStatus: number[]
) {
	// initialize all variables for the algorithm
	const openSet = new PriorityQueue<number>(); // this is the priority queue (main data structure for the algorithm)
	const cameFrom: Record<number, number> = {}; // record of navigated nodes
	const gScore: Record<number, number> = {}; // cost from start along best known path
	const fScore: Record<number, number> = {}; // estimated total cost from start to goal THROUGH y (neighbor evaluation)

	// same visited nodes data structure as in Dijkstra
	const visited: { [node: number]: boolean } = {};

	// add starting node to PQ
	openSet.enqueue(startNode, 0);

	// process starting node
	gScore[startNode] = 0;
	fScore[startNode] = heuristicManhattan(startNode, endNode, width);

	// execute algorithm as long as there are nodes in the priority queue
	while (!openSet.isEmpty()) {
		const current = openSet.dequeue();

		if (current === undefined) {
			break;
		}

		if (fieldStatus[current] === 1) {
			continue;
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
		// evaluate every jps neighbor
		for (const neighbor of getNeighborsWithJumpPoints(
			current,
			endNode,
			width,
			fieldStatus
		)) {
			const tentativeGScore = gScore[current] + 1; // tentativeGScore is the cost from start to the neighbor.

			if (neighbor) {
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
	// calculate the coordinates of the POTENTIAL neighbor
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

function isForcedNeighbor(
	node: number,
	dx: number,
	dy: number,
	width: number,
	fieldStatus: number[]
) {
	const x = (node % width) + dx;
	const y = Math.floor(node / width) + dy;

	if (x < 0 || x >= width || y < 0 || y * width >= fieldStatus.length) {
		return false;
	}

	// handle diagonals
	if (dx !== 0 && dy !== 0) {
		if (fieldStatus[node + dx] === 1 && fieldStatus[node + width * dy] === 1) {
			return false;
		}
	}

	if (fieldStatus[x + y * width] === 1) {
		return false; // Return false if there is a wall in the specified direction
	}

	return true;
}

function getNeighborsWithJumpPoints(
	node: number,
	endNode: number,
	width: number,
	fieldStatus: number[]
) {
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

		// Check if the neighbor is forced
		if (isForcedNeighbor(node, x, y, width, fieldStatus)) {
			const forcedNeighbor = jump(node, x, y, width, fieldStatus);

			neighbors.push(forcedNeighbor);
		} else {
			const neighbor = jump(node, x, y, width, fieldStatus);
			if (neighbor) {
				neighbors.push(neighbor);
			}
		}
	}

	return neighbors;
}
