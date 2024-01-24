"use client";

type AdjacencyList = Record<number, number[]>;

export default function generateAdjacencyList(
	fieldStatus: number[]
): AdjacencyList {
	const dimensions = Math.sqrt(fieldStatus.length);

	if (Number.isInteger(dimensions) === false) {
		return {};
	}

	const adjacencyList: AdjacencyList = {};

	const getIndex = (row: number, col: number): number => row * dimensions + col;

	for (let row = 0; row < dimensions; row++) {
		for (let col = 0; col < dimensions; col++) {
			const currentIndex = getIndex(row, col);

			if (fieldStatus[currentIndex] === 1) {
				continue;
			}

			const neighbors: number[] = [];

			if (row > 0 && fieldStatus[getIndex(row - 1, col)] !== 1) {
				neighbors.push(getIndex(row - 1, col));
			}

			if (row < dimensions - 1 && fieldStatus[getIndex(row + 1, col)] !== 1) {
				neighbors.push(getIndex(row + 1, col));
			}

			if (col > 0 && fieldStatus[getIndex(row, col - 1)] !== 1) {
				neighbors.push(getIndex(row, col - 1));
			}

			if (col < dimensions - 1 && fieldStatus[getIndex(row, col + 1)] !== 1) {
				neighbors.push(getIndex(row, col + 1));
			}

			adjacencyList[currentIndex] = neighbors;
		}
	}

	return adjacencyList;
}
