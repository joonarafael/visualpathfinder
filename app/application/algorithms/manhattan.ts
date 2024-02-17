"use client";

// This is a heuristic distance calculation function called the "Manhattan distance".

export default function heuristicManhattan(
	node: number,
	endNode: number,
	width: number
): number {
	const row0 = Math.floor(node / width);
	const col0 = node % width;
	const row1 = Math.floor(endNode / width);
	const col1 = endNode % width;

	// the actual Manhattan distance is the sum of the absolute differences between the two points:
	return Math.abs(row0 - row1) + Math.abs(col0 - col1);
}
