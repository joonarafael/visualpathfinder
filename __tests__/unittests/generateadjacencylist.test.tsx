import generateAdjacencyList from "@/app/application/algorithms/generateadjacencylist";

describe("basic functionality for generateAdjacencyList", () => {
	it("should generate adjacency list for 72 * 46 input", () => {
		const fieldStatus = Array.from({ length: 72 * 46 }, (_, index) => 0);

		const adjacencyList = generateAdjacencyList(fieldStatus, 72);

		expect(Object.keys(adjacencyList).length).toEqual(3312);
	});

	it("should return empty for full wall grid", () => {
		let fieldStatus = Array.from({ length: 4 * 4 }, (_, index) => 1);

		const adjacencyList = generateAdjacencyList(fieldStatus, 4);

		expect(adjacencyList).toEqual({});
	});
});

describe("logic in generateAdjacencyList", () => {
	it("should skip wall tiles", () => {
		let fieldStatus = Array.from({ length: 4 * 4 }, (_, index) => 0);

		fieldStatus[9] = 1;
		fieldStatus[10] = 1;
		fieldStatus[14] = 1;

		const adjacencyList = generateAdjacencyList(fieldStatus, 4);

		expect(Object.keys(adjacencyList).length).toEqual(13);
		expect("9" in adjacencyList).toEqual(false);
		expect("10" in adjacencyList).toEqual(false);
		expect("14" in adjacencyList).toEqual(false);
	});

	it("detect corners and edges", () => {
		let fieldStatus = Array.from({ length: 4 * 4 }, (_, index) => 0);

		const adjacencyList = generateAdjacencyList(fieldStatus, 4);

		expect(adjacencyList["0"]).toEqual([4, 1, 5]);
		expect(adjacencyList["1"]).toEqual([5, 0, 2, 6, 4]);
		expect(adjacencyList["8"]).toEqual([4, 12, 9, 5, 13]);
		expect(adjacencyList["11"]).toEqual([7, 15, 10, 14, 6]);
		expect(adjacencyList["15"]).toEqual([11, 14, 10]);
	});
});
