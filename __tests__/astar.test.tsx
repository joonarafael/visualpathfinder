import aStar from "@/app/application/algorithms/astar";

describe("basic logic for a_star", () => {
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

		const aStarReturn = aStar(adjacencyList, 13, 15, 4);

		expect(Object.keys(aStarReturn.visited).length).toEqual(10);
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

		const aStarReturn = aStar(adjacencyList, 13, 15, 4);

		expect(aStarReturn.visited["11"]).toEqual(true);
		expect(aStarReturn.visited["15"]).toEqual(undefined);

		if (aStarReturn.shortestPath) {
			expect(aStarReturn.shortestPath.length).toEqual(10);
		} else {
			fail("A* algorithm did not return the 'shortestPath' value.");
		}
	});

	it("give correct return values for an unsolvable matrix", () => {
		const adjacencyList = {
			0: [1, 2, 4],
			1: [0, 2],
			2: [1, 6],
			4: [0, 8],
			6: [2, 7],
			7: [6],
			8: [4, 12],
			12: [8, 13],
			13: [12],
		};

		const aStarReturn = aStar(adjacencyList, 13, 15, 4);

		expect(aStarReturn.visited["7"]).toEqual(true);

		if (!aStarReturn.shortestPath) {
			expect(aStarReturn.visited["13"]).toEqual(true);
		} else {
			fail(
				"A* algorithm returned 'shortestPath' value while no solution exists."
			);
		}
	});
});
