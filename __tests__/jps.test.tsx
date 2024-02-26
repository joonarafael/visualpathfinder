import jps from "@/app/application/algorithms/jps";

const FIELD_STATUS = [0, 0, 0, 1, 0, 1, 0, 0, 0, 1, 1, 0, 0, 0, 1, 0];
const UNSOLVABLE_FIELD_STATUS = [
	0, 0, 0, 1, 0, 1, 0, 0, 0, 1, 1, 1, 0, 0, 1, 0,
];

describe("basic logic for jps", () => {
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

		const jpsReturn = jps(adjacencyList, 13, 15, 4, FIELD_STATUS);

		expect(Object.keys(jpsReturn.visited).length).toEqual(7);
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

		const jpsReturn = jps(adjacencyList, 13, 15, 4, FIELD_STATUS);

		expect(jpsReturn.visited["11"]).toEqual(true);
		expect(jpsReturn.visited["15"]).toEqual(undefined);

		if (jpsReturn.shortestPath) {
			expect(jpsReturn.shortestPath.length).toEqual(5);
		} else {
			fail("JPS algorithm did not return the 'shortestPath' value.");
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

		const jpsReturn = jps(adjacencyList, 13, 15, 4, UNSOLVABLE_FIELD_STATUS);

		expect(jpsReturn.visited["6"]).toEqual(true);

		if (!jpsReturn.shortestPath) {
			expect(jpsReturn.visited["13"]).toEqual(true);
		} else {
			fail(
				"JPS algorithm returned 'shortestPath' value while no solution exists."
			);
		}
	});
});
