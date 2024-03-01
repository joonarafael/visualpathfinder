import dijkstra from "@/app/application/algorithms/dijkstra";
import aStar from "@/app/application/algorithms/astar";
import jps from "@/app/application/algorithms/jps";

import benchmark0 from "@/app/maps/benchmarks/benchmark0";
import city2 from "@/app/maps/cities/city2";
import generateAdjacencyList from "@/app/application/algorithms/generateadjacencylist";

describe("Test algos on on Benchmark 1", () => {
	let fieldStatus = benchmark0;
	let adjacencyList = generateAdjacencyList(fieldStatus, 72);

	let startIndex = fieldStatus.indexOf(2);
	let endIndex = fieldStatus.indexOf(3);

	it("perform parallel test and compare results", () => {
		const dijkstraReturn = dijkstra(adjacencyList, startIndex, endIndex, 72);
		expect(Object.keys(dijkstraReturn.visited).length).toEqual(2613);

		const aStarReturn = aStar(adjacencyList, startIndex, endIndex, 72);
		expect(Object.keys(aStarReturn.visited).length).toEqual(2566);

		const jpsReturn = jps(adjacencyList, startIndex, endIndex, 72, fieldStatus);
		expect(Object.keys(jpsReturn.visited).length).toEqual(48);

		expect(dijkstraReturn.absoluteDistance).toEqual(
			aStarReturn.absoluteDistance
		);
		expect(aStarReturn.absoluteDistance).toEqual(jpsReturn.absoluteDistance);
	});
});

describe("Test algos on on City 3", () => {
	let fieldStatus = city2;
	let adjacencyList = generateAdjacencyList(fieldStatus, 72);

	let startIndex = fieldStatus.indexOf(2);
	let endIndex = fieldStatus.indexOf(3);

	it("perform parallel test and compare results", () => {
		const dijkstraReturn = dijkstra(adjacencyList, startIndex, endIndex, 72);
		expect(Object.keys(dijkstraReturn.visited).length).toEqual(1668);

		const aStarReturn = aStar(adjacencyList, startIndex, endIndex, 72);
		expect(Object.keys(aStarReturn.visited).length).toEqual(776);

		const jpsReturn = jps(adjacencyList, startIndex, endIndex, 72, fieldStatus);
		expect(Object.keys(jpsReturn.visited).length).toEqual(370);

		expect(dijkstraReturn.absoluteDistance).toEqual(
			aStarReturn.absoluteDistance
		);
		expect(aStarReturn.absoluteDistance).toEqual(jpsReturn.absoluteDistance);
	});
});
