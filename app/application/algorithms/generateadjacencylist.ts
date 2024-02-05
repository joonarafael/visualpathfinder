"use client";

type AdjacencyList = Record<number, number[]>;

export default function generateAdjacencyList(
	fieldStatus: number[],
	width: number
): AdjacencyList {
	const colCount = width;
	const rowCount = fieldStatus.length / colCount;

	const adjacencyList: AdjacencyList = {};

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

			// diagonals
			if (
				row > 0 &&
				col < colCount - 1 &&
				fieldStatus[getIndex(row - 1, col + 1)] !== 1
			) {
				neighbors.push(getIndex(row - 1, col + 1));
			}

			if (
				row < rowCount - 1 &&
				col < colCount - 1 &&
				fieldStatus[getIndex(row + 1, col + 1)] !== 1
			) {
				neighbors.push(getIndex(row + 1, col + 1));
			}

			if (
				row < rowCount - 1 &&
				col > 0 &&
				fieldStatus[getIndex(row + 1, col - 1)] !== 1
			) {
				neighbors.push(getIndex(row + 1, col - 1));
			}

			if (row > 0 && col > 0 && fieldStatus[getIndex(row - 1, col - 1)] !== 1) {
				neighbors.push(getIndex(row - 1, col - 1));
			}

			adjacencyList[currentIndex] = neighbors;
		}
	}

	return adjacencyList;
}