import dijkstra from "@/app/application/algorithms/dijkstra";

describe("basic logic for dijkstra", () => {
	it("create distances and visited objects", () => {
		const adjacencyList = {
			0: [1, 2, 4],
			1: [0, 2],
			2: [1, 6],
			4: [0, 8],
			6: [2, 7],
			7: [6, 11],
			8: [4, 12],
			11: [7, 15],
			12: [8, 13],
			13: [12],
			15: [11],
		};

		const dijkstraReturn = dijkstra(adjacencyList, 13, 15);

		expect(Object.keys(dijkstraReturn.distances).length).toEqual(11);
		expect(Object.keys(dijkstraReturn.visited).length).toEqual(11);
	});

	it("solve a solvable matrix", () => {
		const adjacencyList = {
			0: [1, 2, 4],
			1: [0, 2],
			2: [1, 6],
			4: [0, 8],
			6: [2, 7],
			7: [6, 11],
			8: [4, 12],
			11: [7, 15],
			12: [8, 13],
			13: [12],
			15: [11],
		};

		const dijkstraReturn = dijkstra(adjacencyList, 13, 15);

		expect(dijkstraReturn.visited["11"]).toEqual(true);
		expect(dijkstraReturn.visited["15"]).toEqual(false);
		expect(dijkstraReturn.distances["15"]).toEqual(9);

		expect(dijkstraReturn).toHaveProperty("shortestPath");

		if (dijkstraReturn.shortestPath) {
			expect(dijkstraReturn.shortestPath.length).toEqual(10);
		} else {
			fail("Dijkstra algorithm did not return the 'shortestPath' value.");
		}
	});
});
