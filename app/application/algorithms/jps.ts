"use client";

import heuristicEuclidean from "./euclidean";
import PriorityQueue from "./pq";

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

	const directions: Record<number, Set<string>> = {};

	const visited: { [node: number]: boolean } = {};

	openSet.enqueue(startNode, 0);

	// only the start node is expanded into every 8 direction as a default
	directions[startNode] = new Set([
		"1,0",
		"-1,0",
		"0,1",
		"0,-1",
		"1,-1",
		"1,1",
		"-1,1",
		"-1,-1",
	]);

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
					(fScore[endNode] + Number.EPSILON).toFixed(1)
				),
			};
		}

		// request all neighbors
		// they are either immediately adjacent nodes or jump points far, far away
		const neighbors = getNeighborsWithJumpPoints(
			current,
			adjacencyList,
			width,
			fieldStatus,
			directions
		);

		for (const neighbor of neighbors) {
			const tentativeGScore =
				gScore[current] + heuristicEuclidean(current, neighbor, width);

			if (
				!gScore.hasOwnProperty(neighbor) ||
				tentativeGScore < gScore[neighbor]
			) {
				cameFrom[neighbor] = current;

				gScore[neighbor] = tentativeGScore;
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
	directions: Record<number, Set<string>>
): any {
	if (fieldStatus[target] === 3) {
		return target;
	}

	let forcedNeighbors: string[] = [];

	// x movement
	if (dy === 0) {
		const north = target - width;
		const south = target + width;

		// forced neighbor checking
		if (north > 0 && !adjacencyList[target].includes(north)) {
			if (adjacencyList[target].includes(north + dx)) {
				forcedNeighbors.push(`${dx},-1`);
			}
		}

		if (south < fieldStatus.length && !adjacencyList[target].includes(south)) {
			if (adjacencyList[target].includes(south + dx)) {
				forcedNeighbors.push(`${dx},1`);
			}
		}

		// forced neighbors detected
		// terminate jump, return target and ask for later exploring in the relevant directions
		if (forcedNeighbors.length > 0) {
			forcedNeighbors.push(`${dx},${dy}`);

			if (!(target in directions)) {
				directions[target] = new Set();
			}

			for (const item of forcedNeighbors) {
				directions[target].add(item);
			}

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
	// logic identical to x movement
	const west = target - 1;
	const east = target + 1;

	if (
		Math.floor(west / width) === Math.floor(target / width) &&
		!adjacencyList[target].includes(west)
	) {
		if (adjacencyList[target].includes(west + dy * width)) {
			forcedNeighbors.push(`-1,${dy}`);
		}
	}

	if (
		Math.floor(east / width) === Math.floor(target / width) &&
		!adjacencyList[target].includes(east)
	) {
		if (adjacencyList[target].includes(east + dy * width)) {
			forcedNeighbors.push(`1,${dy}`);
		}
	}

	if (forcedNeighbors.length > 0) {
		forcedNeighbors.push(`${dx},${dy}`);

		if (!(target in directions)) {
			directions[target] = new Set();
		}

		for (const item of forcedNeighbors) {
			directions[target].add(item);
		}

		return target;
	}

	const next = target + dy * width;

	if (!adjacencyList[target].includes(next)) {
		return null;
	}

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
	directions: Record<number, Set<string>>
): any {
	if (fieldStatus[target] === 3) {
		return target;
	}

	const xBlocker = target - dx;
	const yBlocker = target - dy * width;

	// check for forced neighbors
	if (
		Math.floor(xBlocker / width) === Math.floor(target / width) &&
		!adjacencyList[target].includes(xBlocker)
	) {
		if (adjacencyList[target].includes(xBlocker + dy * width)) {
			const forcedNeighbors = [
				`${dx},${dy}`,
				`${-dx},${dy}`,
				`0,${dy}`,
				`${dx},0`,
			];

			if (!(target in directions)) {
				directions[target] = new Set();
			}

			for (const item of forcedNeighbors) {
				directions[target].add(item);
			}

			return target;
		}
	}

	if (
		yBlocker > 0 &&
		yBlocker < fieldStatus.length &&
		!adjacencyList[target].includes(yBlocker)
	) {
		if (adjacencyList[target].includes(yBlocker + dx)) {
			const forcedNeighbors = [
				`${dx},${dy}`,
				`${dx},${-dy}`,
				`0,${dy}`,
				`${dx},0`,
			];

			if (!(target in directions)) {
				directions[target] = new Set();
			}

			for (const item of forcedNeighbors) {
				directions[target].add(item);
			}

			return target;
		}
	}

	// no forced neighbors
	// perform cardinal direction scanning
	const xNeighbor = target + dx;
	const yNeighbor = target + dy * width;

	let scans: string[] = [];

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
			scans.push(`${dx},0`);
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
			scans.push(`0,${dy}`);
		}
	}

	// cardinal direction scans returned something
	if (scans.length > 0) {
		scans.push(`${dx},${dy}`);

		if (!(target in directions)) {
			directions[target] = new Set();
		}

		for (const item of scans) {
			directions[target].add(item);
		}

		return target;
	}

	// no forced neighbors, no hits from cardinal direction scans
	const next = target + dx + dy * width;

	if (!adjacencyList[target].includes(next)) {
		return null;
	}

	// continue the diagonal jump
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
	directions: Record<number, Set<string>>
) {
	const target = parent + dx + width * dy;

	if (!adjacencyList[parent].includes(target)) {
		return null;
	}

	if (fieldStatus[target] === 3) {
		return target;
	}

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
 * Returns all neighbors of the given parent node that can be reached by a jump (could be immediately adjacent nodes too).
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
	directions: Record<number, Set<string>>
) {
	const neighbors: number[] = [];

	let absoluteDirections: Set<string>;

	// final failsafe
	// if the parent node has no directions set, initialize all 8 directions
	if (!directions.hasOwnProperty(parent)) {
		absoluteDirections = new Set([
			"1,0",
			"-1,0",
			"0,1",
			"0,-1",
			"1,-1",
			"1,1",
			"-1,1",
			"-1,-1",
		]);
	} else {
		absoluteDirections = directions[parent];
	}

	for (const direction of absoluteDirections) {
		const [dx, dy] = direction.split(",").map(Number);

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
