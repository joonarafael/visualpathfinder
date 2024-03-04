import isDiagonal from "@/app/application/algorithms/isdiagonal";

test("In 2x2 grid, points (0, 0) and (1, 1) are diagonal", () => {
	expect(isDiagonal(0, 3, 2)).toBe(true);
});

test("In 4x4 grid, points (3, 3) and (2, 2) are diagonal", () => {
	expect(isDiagonal(15, 10, 4)).toBe(true);
});

test("In 2x2 grid, points (0, 0) and (0, 1) are not diagonal", () => {
	expect(isDiagonal(0, 1, 2)).toBe(false);
});

test("In 4x4 grid, points (3, 3) and (4, 3) are not diagonal", () => {
	expect(isDiagonal(15, 14, 4)).toBe(false);
});
