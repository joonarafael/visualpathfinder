import dijkstra from "@/app/application/algorithms/dijkstra";
import aStar from "@/app/application/algorithms/astar";
import jps from "@/app/application/algorithms/jps";

import hightown from "@/app/maps/virtual/hightown";
import generateAdjacencyList from "@/app/application/algorithms/generateadjacencylist";

describe("Test performance for the algos on the virtual map 'High Town'", () => {
	const fieldStatus = hightown;
	const width = 514;

	const runAlgorithm = (tmp: number[], start: number, finish: number) => {
		const adjacencyList = generateAdjacencyList(tmp, width);

		const dijkstraStart = performance.now();
		dijkstra(adjacencyList, start, finish, width);
		const dijkstraEnd = performance.now();

		const aStarStart = performance.now();
		aStar(adjacencyList, start, finish, width);
		const aStarEnd = performance.now();

		const jpsStart = performance.now();
		jps(adjacencyList, start, finish, width, tmp);
		const jpsEnd = performance.now();

		return {
			dijkstra: parseFloat(
				(dijkstraEnd - dijkstraStart + Number.EPSILON).toFixed(1)
			),
			aStar: parseFloat((aStarEnd - aStarStart + Number.EPSILON).toFixed(1)),
			jps: parseFloat((jpsEnd - jpsStart + Number.EPSILON).toFixed(1)),
		};
	};

	it("JPS should average out to be fastest, then A* and lastly Dijkstra", () => {
		const tmp = [...fieldStatus];

		let dijkstraCumulative = 0;
		let aStarCumulative = 0;
		let jpsCumulative = 0;

		for (let i = 0; i < 20; i++) {
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

			const times = runAlgorithm(tmp, start, finish);

			dijkstraCumulative += times.dijkstra;
			aStarCumulative += times.aStar;
			jpsCumulative += times.jps;
		}

		expect(dijkstraCumulative).toBeGreaterThan(aStarCumulative);
		expect(aStarCumulative).toBeGreaterThan(jpsCumulative);
	});
});
