"use client";

/**
 * Returns true if the two nodes are diagonal, false otherwise.
 * Nodes do not need to be immediately diagonally adjacent (absolute distance can be >sqrt(2)).
 * @param node - The parent ode index.
 * @param neighbor - The neighbor node index.
 * @param width - The width of the grid.
 * @returns true if the two nodes are diagonal, false otherwise.
 */
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

	return rowDiff > 0 && colDiff > 0 && rowDiff === colDiff;
}
