"use client";

export default function isDiagonal(
	node: number,
	neighbor: number,
	width: number
): boolean {
	const row0 = Math.floor(node / width);
	const col0 = node % width;
	const row1 = Math.floor(neighbor / width);
	const col1 = neighbor % width;

	const rowDiff = Math.abs(row0 - row1);
	const colDiff = Math.abs(col0 - col1);

	return rowDiff === 1 && colDiff === 1;
}
