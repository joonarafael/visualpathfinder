"use client";

export default function heuristicManhattan(
	node: number,
	endNode: number,
	width: number
): number {
	// helper calculations to get the row and column indexes of nodes
	const row0 = Math.floor(node / width);
	const col0 = node % width;
	const row1 = Math.floor(endNode / width);
	const col1 = endNode % width;

	// the actual Manhattan distance is the sum of the absolute differences between the two points:
	return Math.abs(row0 - row1) + Math.abs(col0 - col1);
}
