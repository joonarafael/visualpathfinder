import heuristicManhattan from "@/app/application/algorithms/manhattan";

// Manhattan function arguments:
// startNode index, endNode index, field width

// This means that nodes (0, 0) and (1, 1) in a field of a width 2, have indexes 0 and 3.

test("Manhattan distance between (0, 0) and (1, 1) should be 2", () => {
	expect(heuristicManhattan(0, 3, 2)).toBe(2);
});

test("Manhattan distance between the same node should be 0", () => {
	expect(heuristicManhattan(3, 3, 3)).toBe(0);
});

test("Manhattan distance between nodes in the same row should be the absolute column difference", () => {
	expect(heuristicManhattan(5, 7, 4)).toBe(2);
});

test("Manhattan distance between nodes in the same column should be the absolute row difference", () => {
	expect(heuristicManhattan(8, 0, 4)).toBe(2);
});

test("Manhattan distance between nodes with different row and column values", () => {
	expect(heuristicManhattan(12, 7, 4)).toBe(5);
});
