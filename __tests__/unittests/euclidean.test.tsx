import heuristicEuclidean from "@/app/application/algorithms/euclidean";

// Euclidean function arguments:
// startNode index, endNode index, field width

// This means that nodes (0, 0) and (1, 1) in a field of a width 2, have indexes 0 and 3.

test("Euclidean distance between (0, 0) and (1, 1) should be 2", () => {
	const result = heuristicEuclidean(0, 3, 2);
	expect(result).toBeCloseTo(Math.sqrt(2), 2);
});

test("Euclidean distance between the same node should be 0", () => {
	expect(heuristicEuclidean(3, 3, 3)).toBe(0);
});

test("Euclidean distance between nodes in the same row should be the absolute column difference", () => {
	expect(heuristicEuclidean(5, 7, 4)).toBe(2);
});

test("Euclidean distance between nodes in the same column should be the absolute row difference", () => {
	expect(heuristicEuclidean(8, 0, 4)).toBe(2);
});

test("Euclidean distance between nodes with different row and column values", () => {
	const result = heuristicEuclidean(12, 7, 4);
	expect(result).toBeCloseTo(Math.sqrt(13), 2);
});
