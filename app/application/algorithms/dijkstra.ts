"use client";

interface AdjacencyList {
	[node: number]: number[];
}

interface Distances {
	[node: number]: number;
}

interface DijkstraResult {
	distances: { [node: number]: number };
	visited: { [node: number]: boolean };
}

export default function dijkstra(
	adjacencyList: AdjacencyList,
	start: number
): DijkstraResult {
	const numNodes = Object.keys(adjacencyList).length;
	const distances: Distances = {};
	const visited: { [node: number]: boolean } = {};

	for (let node in adjacencyList) {
		distances[node] = Number.MAX_VALUE;
		visited[node] = false;
	}

	distances[start] = 0;

	while (true) {
		let shortestDistance = Number.MAX_VALUE;
		let currentNode: number | null = null;

		for (let node in distances) {
			if (distances[node] < shortestDistance && !visited[node]) {
				shortestDistance = distances[node];
				currentNode = parseInt(node, 10);
			}
		}

		if (currentNode === null) {
			return { distances, visited };
		}

		for (let neighbor of adjacencyList[currentNode]) {
			const distanceToNeighbor = shortestDistance + 1;

			if (distanceToNeighbor < distances[neighbor]) {
				distances[neighbor] = distanceToNeighbor;
			}
		}

		visited[currentNode] = true;
	}
}
