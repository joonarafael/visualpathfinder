import aStar from "@/app/application/algorithms/astar";

describe("basic logic for a_star", () => {
	it("create distances and visited objects", () => {
		const adjacencyList = {
			0: [1, 4],
			1: [0, 2, 4, 6],
			2: [1, 6, 7],
			4: [0, 1, 8],
			6: [1, 2, 7, 11],
			7: [2, 6, 11],
			8: [4, 12, 13],
			11: [6, 7, 15],
			12: [8, 13],
			13: [8, 12],
			15: [11],
		};

		const aStarReturn = aStar(adjacencyList, 13, 15, 4);

		expect(Object.keys(aStarReturn.visited).length).toEqual(8);
	});

	it("solve a solvable matrix", () => {
		const adjacencyList = {
			0: [1, 4],
			1: [0, 2, 4, 6],
			2: [1, 6, 7],
			4: [0, 1, 8],
			6: [1, 2, 7, 11],
			7: [2, 6, 11],
			8: [4, 12, 13],
			11: [6, 7, 15],
			12: [8, 13],
			13: [8, 12],
			15: [11],
		};

		const aStarReturn = aStar(adjacencyList, 13, 15, 4);

		expect(aStarReturn.visited["11"]).toEqual(true);
		expect(aStarReturn.visited["15"]).toEqual(undefined);

		if (aStarReturn.shortestPath) {
			expect(aStarReturn.shortestPath.length).toEqual(7);
		} else {
			fail("A* algorithm did not return the 'shortestPath' value.");
		}
	});

	it("give correct return values for an unsolvable matrix", () => {
		const adjacencyList = {
			0: [1, 4],
			1: [0, 2, 4, 6],
			2: [1, 6, 7],
			4: [0, 1, 8],
			6: [1, 2, 7],
			7: [2, 6],
			8: [4, 12, 13],
			12: [8, 13],
			13: [8, 12],
			15: [],
		};

		const aStarReturn = aStar(adjacencyList, 13, 15, 4);

		expect(aStarReturn.visited["6"]).toEqual(true);

		if (!aStarReturn.shortestPath) {
			expect(aStarReturn.visited["13"]).toEqual(true);
		} else {
			fail(
				"A* algorithm returned 'shortestPath' value while no solution exists."
			);
		}
	});
});
