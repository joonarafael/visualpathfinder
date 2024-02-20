"use client";

interface AdjacencyList {
	[node: number]: number[];
}

interface Distances {
	[node: number]: number;
}

interface Parents {
	[node: number]: number | null;
}

interface DijkstraResult {
	visited: { [node: number]: boolean };
	shortestPath?: number[];
	absoluteDistance?: number;
}

export default function dijkstra(
	adjacencyList: AdjacencyList,
	startNode: number,
	endNode: number,
	width: number
): DijkstraResult {
	const distances: Distances = {};
	const visited: { [node: number]: boolean } = {};
	const parents: Parents = {};

	// initialize all distances to infinity
	for (let node in adjacencyList) {
		distances[node] = Number.MAX_VALUE;
		visited[node] = false;
		parents[node] = null;
	}

	distances[startNode] = 0;

	while (true) {
		let shortestDistance = Number.MAX_VALUE;
		let currentNode: number | null = null;

		for (let node in distances) {
			if (distances[node] < shortestDistance && !visited[node]) {
				shortestDistance = distances[node];
				currentNode = parseInt(node, 10);
			}
		}

		// end node was never reached
		if (currentNode === null) {
			return { visited };
		}

		// end node found, construct shortest path
		if (currentNode === endNode) {
			const shortestPath: number[] = [];
			let node: number | null = endNode;

			while (node !== null) {
				shortestPath.unshift(node);
				node = parents[node] ?? null;
			}

			return {
				visited,
				shortestPath,
				absoluteDistance: parseFloat(
					(distances[endNode] + Number.EPSILON).toFixed(1)
				),
			};
		}

		for (let neighbor of adjacencyList[currentNode]) {
			let distanceToNeighbor = shortestDistance + 1;

			if (isDiagonal(currentNode, neighbor, width)) {
				distanceToNeighbor = shortestDistance + Math.sqrt(2);
			}

			if (distanceToNeighbor <= distances[neighbor]) {
				distances[neighbor] = distanceToNeighbor;
				parents[neighbor] = currentNode;
			}
		}

		visited[currentNode] = true;
	}
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
