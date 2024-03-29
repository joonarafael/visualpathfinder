import dijkstra from "@/app/application/algorithms/dijkstra";
import aStar from "@/app/application/algorithms/astar";
import jps from "@/app/application/algorithms/jps";

import city2 from "@/app/maps/cities/city2";
import generateAdjacencyList from "@/app/application/algorithms/generateadjacencylist";

describe("Test algos on the map 'city2.tsx'", () => {
	const fieldStatus = city2;

	const originalStartIndex = fieldStatus.indexOf(2);

	if (originalStartIndex !== -1) {
		fieldStatus[originalStartIndex] = 0;
	}

	const originalEndIndex = fieldStatus.indexOf(3);

	if (originalEndIndex !== -1) {
		fieldStatus[originalEndIndex] = 0;
	}

	const width = 72;

	const runAlgorithm = (tmp: number[], start: number, finish: number) => {
		const adjacencyList = generateAdjacencyList(tmp, width);

		const dijkstraReturn = dijkstra(adjacencyList, start, finish, width);

		const aStarReturn = aStar(adjacencyList, start, finish, width);

		const jpsReturn = jps(adjacencyList, start, finish, width, tmp);

		return {
			dijkstra: dijkstraReturn?.absoluteDistance,
			aStar: aStarReturn?.absoluteDistance,
			jps: jpsReturn?.absoluteDistance,
		};
	};

	it("pathfinding algorithms should yield the same Euclidean path length", () => {
		const tmp = [...fieldStatus];

		for (let i = 0; i < 100; i++) {
			let start = Math.floor(Math.random() * (tmp.length - 1));
			let finish = Math.floor(Math.random() * (tmp.length - 1));

			while (tmp[start] === 1) {
				start = Math.floor(Math.random() * (tmp.length - 1));
			}

			while (tmp[finish] === 1) {
				finish = Math.floor(Math.random() * (tmp.length - 1));
			}

			while (start === finish) {
				finish = Math.floor(Math.random() * (tmp.length - 1));
			}

			tmp[start] = 2;
			tmp[finish] = 3;

			const stats = runAlgorithm(tmp, start, finish);

			if (stats.dijkstra && stats.aStar && stats.jps) {
				expect(stats.dijkstra).toEqual(stats.aStar);
				expect(stats.aStar).toEqual(stats.jps);
			}
		}
	});
});
