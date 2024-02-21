"use client";

// Euclidean distance function to calculate the distance between two points

export default function heuristicEuclidean(
	node: number,
	endNode: number,
	width: number
): number {
	const row0 = Math.floor(node / width);
	const col0 = node % width;
	const row1 = Math.floor(endNode / width);
	const col1 = endNode % width;

	const rowDiff = row1 - row0;
	const colDiff = col1 - col0;

	// Euclidean distance formula
	return Math.sqrt(rowDiff * rowDiff + colDiff * colDiff);
}
