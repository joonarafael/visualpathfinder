"use client";

// This functions is responsible for analyzing the grid and creating a one-dimensional adjacency list.
// The returning list is a type of object where each node is a key with a list of neighbors is as its value.

type AdjacencyList = Record<number, number[]>;

export default function generateAdjacencyList(
	fieldStatus: number[],
	width: number
): AdjacencyList {
	const colCount = width;
	const rowCount = fieldStatus.length / colCount;

	const adjacencyList: AdjacencyList = {};

	// function to get a single index for a (x, y) coordinate.
	const getIndex = (row: number, col: number): number => row * colCount + col;

	for (let row = 0; row < rowCount; row++) {
		for (let col = 0; col < colCount; col++) {
			const currentIndex = getIndex(row, col);

			if (fieldStatus[currentIndex] === 1) {
				continue;
			}

			const neighbors: number[] = [];

			// cardinal directions
			if (row > 0 && fieldStatus[getIndex(row - 1, col)] !== 1) {
				neighbors.push(getIndex(row - 1, col));
			}

			if (row < rowCount - 1 && fieldStatus[getIndex(row + 1, col)] !== 1) {
				neighbors.push(getIndex(row + 1, col));
			}

			if (col > 0 && fieldStatus[getIndex(row, col - 1)] !== 1) {
				neighbors.push(getIndex(row, col - 1));
			}

			if (col < colCount - 1 && fieldStatus[getIndex(row, col + 1)] !== 1) {
				neighbors.push(getIndex(row, col + 1));
			}

			// diagonals (8-way traversal)
			if (
				row > 0 &&
				col < colCount - 1 &&
				fieldStatus[getIndex(row - 1, col + 1)] !== 1
			) {
				if (
					neighbors.includes(getIndex(row - 1, col)) ||
					neighbors.includes(getIndex(row, col + 1))
				) {
					neighbors.push(getIndex(row - 1, col + 1));
				}
			}

			if (
				row < rowCount - 1 &&
				col < colCount - 1 &&
				fieldStatus[getIndex(row + 1, col + 1)] !== 1
			) {
				if (
					neighbors.includes(getIndex(row, col + 1)) ||
					neighbors.includes(getIndex(row + 1, col))
				) {
					neighbors.push(getIndex(row + 1, col + 1));
				}
			}

			if (
				row < rowCount - 1 &&
				col > 0 &&
				fieldStatus[getIndex(row + 1, col - 1)] !== 1
			) {
				if (
					neighbors.includes(getIndex(row, col - 1)) ||
					neighbors.includes(getIndex(row + 1, col))
				) {
					neighbors.push(getIndex(row + 1, col - 1));
				}
			}

			if (row > 0 && col > 0 && fieldStatus[getIndex(row - 1, col - 1)] !== 1) {
				if (
					neighbors.includes(getIndex(row, col - 1)) ||
					neighbors.includes(getIndex(row - 1, col))
				) {
					neighbors.push(getIndex(row - 1, col - 1));
				}
			}

			adjacencyList[currentIndex] = neighbors;
		}
	}

	return adjacencyList;
}
