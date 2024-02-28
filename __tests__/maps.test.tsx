import dijkstra from "@/app/application/algorithms/dijkstra";
import aStar from "@/app/application/algorithms/astar";
import jps from "@/app/application/algorithms/jps";

import benchmark0 from "@/app/maps/benchmarks/benchmark0";
import generateAdjacencyList from "@/app/application/algorithms/generateadjacencylist";

describe("Test algos on a proper 72x48 map", () => {
	const fieldStatus = benchmark0;
	const adjacencyList = generateAdjacencyList(fieldStatus, 72);

	const startIndex = fieldStatus.indexOf(2);
	const endIndex = fieldStatus.indexOf(3);

	it("perform parallel test and compare results", () => {
		const dijkstraReturn = dijkstra(adjacencyList, startIndex, endIndex, 72);
		expect(Object.keys(dijkstraReturn.visited).length).toEqual(2613);

		const aStarReturn = aStar(adjacencyList, startIndex, endIndex, 72);
		expect(Object.keys(aStarReturn.visited).length).toEqual(2566);

		const jpsReturn = jps(adjacencyList, startIndex, endIndex, 72, fieldStatus);
		expect(Object.keys(jpsReturn.visited).length).toEqual(98);

		expect(dijkstraReturn.absoluteDistance).toEqual(
			aStarReturn.absoluteDistance
		);
		expect(aStarReturn.absoluteDistance).toEqual(jpsReturn.absoluteDistance);
	});
});
