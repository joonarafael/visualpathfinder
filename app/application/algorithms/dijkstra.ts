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
	distances?: Distances;
	visited: { [node: number]: boolean };
	shortestPath?: number[];
}

export default function dijkstra(
	adjacencyList: AdjacencyList,
	startNode: number,
	endNode: number
): DijkstraResult {
	const distances: Distances = {};
	const visited: { [node: number]: boolean } = {};

	// parents keeps track of the final correct path
	// it is not necessary to execute Dijkstra in general
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
			// this is the logic to actually return the shortest found path with the help of the parents array
			const shortestPath: number[] = [];
			let node: number | null = endNode;

			while (node !== null) {
				shortestPath.unshift(node);
				node = parents[node] ?? null;
			}

			// terminate execution as the end was found.
			return { distances, visited, shortestPath };
		}

		for (let neighbor of adjacencyList[currentNode]) {
			const distanceToNeighbor = shortestDistance + 1;

			if (distanceToNeighbor <= distances[neighbor]) {
				distances[neighbor] = distanceToNeighbor;

				// to display the shortest path, we add the parent for later path finding
				parents[neighbor] = currentNode;
			}
		}

		visited[currentNode] = true;
	}
}
