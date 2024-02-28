"use client";

import heuristicEuclidean from "./euclidean";
import PriorityQueue from "./pq";

// jps is a special A* algorithm.
// it removes the amount of nodes

/**
 * Runs the Jump Point Search algorithm on the given grid.
 *
 * @param adjacencyList - a map of node indices to their adjacent node indices
 * @param startNode - the index of the starting node
 * @param endNode - the index of the ending node
 * @param width - the width of the grid
 * @param fieldStatus - an array of node statuses, where 0 = path, 1 = wall, 2 = start, and 3 = goal
 * @returns an object containing the shortest path, visited nodes, and the absolute distance to the goal node (euclidean path (diagonals sqrt(2))).
 */
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
	const directions: Record<number, number[][]> = {};

	const visited: { [node: number]: boolean } = {};

	openSet.enqueue(startNode, 0);

	gScore[startNode] = 0;
	fScore[startNode] = heuristicEuclidean(startNode, endNode, width);
	directions[startNode] = [
		[0, 1],
		[0, -1],
		[1, 0],
		[-1, 0],
		[1, 1],
		[-1, -1],
		[1, -1],
		[-1, 1],
	];

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

		// request all neighbors with their jump points
		const neighbors = getNeighborsWithJumpPoints(
			current,
			adjacencyList,
			width,
			fieldStatus,
			directions
		);

		for (const neighbor of neighbors) {
			// distance calculation and pq logic works exactly the same as in A*
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

/**
 * Prunes straight direction neighbors from the target node.
 *
 * @param target - the target node index in the master grid
 * @param dx - the x-direction
 * @param dy - the y-direction
 * @param adjacencyList - the adjacency list of the master grid
 * @param width - the width of the master grid
 * @param fieldStatus - the status of each node in the master grid
 * @returns the target node if forced neighbors are found, null if it runs to a wall
 */
function pruneStraightDirectionNeighbors(
	target: number,
	dx: number,
	dy: number,
	adjacencyList: Record<number, number[]>,
	width: number,
	fieldStatus: number[],
	directions: Record<number, number[][]>
): any {
	if (fieldStatus[target] === 3) {
		return target;
	}

	let forcedNeighbors = false;

	// x movement
	if (dy === 0) {
		const north = target - width;
		const south = target + width;

		if (north > 0 && !adjacencyList[target].includes(north)) {
			if (adjacencyList[target].includes(north + dx)) {
				forcedNeighbors = true;
				if (!directions[target]) {
					directions[target] = [];
				}
				directions[target].push([dx, -1]);
			}
		}

		if (south < fieldStatus.length && !adjacencyList[target].includes(south)) {
			if (adjacencyList[target].includes(south + dx)) {
				forcedNeighbors = true;
				if (!directions[target]) {
					directions[target] = [];
				}
				directions[target].push([dx, 1]);
			}
		}

		if (forcedNeighbors) {
			directions[target].push([dx, dy]);
			return target;
		}

		const next = target + dx;

		if (!adjacencyList[target].includes(next)) {
			return null;
		}

		// continue jump
		return jump(target, dx, dy, adjacencyList, width, fieldStatus, directions);
	}

	// y movement
	const west = target - 1;
	const east = target + 1;

	if (
		Math.floor(west / width) === Math.floor(target / width) &&
		!adjacencyList[target].includes(west)
	) {
		if (adjacencyList[target].includes(west + dy * width)) {
			forcedNeighbors = true;
			if (!directions[target]) {
				directions[target] = [];
			}
			directions[target].push([-1, dy]);
		}
	}

	if (
		Math.floor(east / width) === Math.floor(target / width) &&
		!adjacencyList[target].includes(east)
	) {
		if (adjacencyList[target].includes(east + dy * width)) {
			forcedNeighbors = true;
			if (!directions[target]) {
				directions[target] = [];
			}
			directions[target].push([1, dy]);
		}
	}

	if (forcedNeighbors) {
		directions[target].push([dx, dy]);
		return target;
	}

	const next = target + dy * width;

	if (!adjacencyList[target].includes(next)) {
		return null;
	}

	// continue jump
	return jump(target, dx, dy, adjacencyList, width, fieldStatus, directions);
}

/**
 * Prunes diagonal direction neighbors from the target node.
 * It has to do additional cardinal direction scanning before recursion.
 *
 * @param target - the target node index in the master grid
 * @param dx - the x-direction
 * @param dy - the y-direction
 * @param adjacencyList - the adjacency list of the master grid
 * @param width - the width of the master grid
 * @param fieldStatus - the status of each node in the master grid
 * @returns the target node if forced neighbors are found, null if it runs to a wall
 */
function pruneDiagonalNeighbors(
	target: number,
	dx: number,
	dy: number,
	adjacencyList: Record<number, number[]>,
	width: number,
	fieldStatus: number[],
	directions: Record<number, number[][]>
): any {
	if (fieldStatus[target] === 3) {
		return target;
	}

	const xBlocker = target - dx;
	const yBlocker = target - dy * width;

	if (
		Math.floor(xBlocker / width) === Math.floor(target / width) &&
		!adjacencyList[target].includes(xBlocker)
	) {
		if (adjacencyList[target].includes(xBlocker + dy * width)) {
			directions[target] = [
				[dx, dy],
				[0, dy],
				[dx, 0],
				[-dx, dy],
			];
			return target;
		}
	}

	if (
		yBlocker > 0 &&
		yBlocker < fieldStatus.length &&
		!adjacencyList[target].includes(yBlocker)
	) {
		if (adjacencyList[target].includes(yBlocker + dx)) {
			directions[target] = [
				[dx, dy],
				[0, dy],
				[dx, 0],
				[dx, -dy],
			];
			return target;
		}
	}

	const xNeighbor = target + dx;
	const yNeighbor = target + dy * width;

	if (adjacencyList[target].includes(xNeighbor)) {
		const resultX = pruneStraightDirectionNeighbors(
			xNeighbor,
			dx,
			0,
			adjacencyList,
			width,
			fieldStatus,
			directions
		);

		if (resultX !== null) {
			directions[target] = [
				[dx, dy],
				[dx, 0],
			];
			return target;
		}
	}

	if (adjacencyList[target].includes(yNeighbor)) {
		const resultY = pruneStraightDirectionNeighbors(
			yNeighbor,
			0,
			dy,
			adjacencyList,
			width,
			fieldStatus,
			directions
		);

		if (resultY !== null) {
			directions[target] = [
				[dx, dy],
				[0, dy],
			];
			return target;
		}
	}

	const next = target + dx + dy * width;

	if (!adjacencyList[target].includes(next)) {
		return null;
	}

	// continue jump
	return jump(target, dx, dy, adjacencyList, width, fieldStatus, directions);
}

/**
 * Base function to perform the jumping. Requests either straight or diagonal direction neighbor pruning.
 *
 * @param parent - the base node index out of where the jump is performed
 * @param dx - the x-direction
 * @param dy - the y-direction
 * @param adjacencyList - the adjacency list of the master grid
 * @param width - the width of the master grid
 * @param fieldStatus - the status of each node in the master grid
 * @returns the target node if endNode or forced neighbors are found, null if it runs to a wall
 */
function jump(
	parent: number, // parent master index
	dx: number, // requested x direction
	dy: number, // requested y direction
	adjacencyList: Record<number, number[]>,
	width: number,
	fieldStatus: number[],
	directions: Record<number, number[][]>
) {
	// check if we run into a wall
	const target = parent + dx + width * dy;

	if (!adjacencyList[parent].includes(target)) {
		return null;
	}

	// did we just find the goal?
	if (fieldStatus[target] === 3) {
		return target;
	}

	// diagonal moves
	if (dx !== 0 && dy !== 0) {
		return pruneDiagonalNeighbors(
			target,
			dx,
			dy,
			adjacencyList,
			width,
			fieldStatus,
			directions
		);
	}

	// straight moves
	return pruneStraightDirectionNeighbors(
		target,
		dx,
		dy,
		adjacencyList,
		width,
		fieldStatus,
		directions
	);
}

/**
 * Returns all neighbors of the given parent node that can be reached by a jump.
 * @param parent - the node index of the parent node
 * @param adjacencyList - the adjacency list of the master grid
 * @param width - the width of the master grid
 * @param fieldStatus - the status of each node in the master grid
 * @returns an array of node indices that can be reached by a jump
 */
function getNeighborsWithJumpPoints(
	parent: number,
	adjacencyList: Record<number, number[]>,
	width: number,
	fieldStatus: number[],
	directions: Record<number, number[][]>
) {
	const neighbors: number[] = [];

	for (const direction of directions[parent]) {
		const dx = direction[0];
		const dy = direction[1];

		const neighbor = jump(
			parent,
			dx,
			dy,
			adjacencyList,
			width,
			fieldStatus,
			directions
		);

		if (neighbor !== null && neighbor !== undefined) {
			neighbors.push(neighbor);
		}
	}

	return neighbors;
}
