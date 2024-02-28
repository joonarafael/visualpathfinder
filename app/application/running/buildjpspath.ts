"use client";

import heuristicEuclidean from "../algorithms/euclidean";
import isDiagonal from "../algorithms/isdiagonal";

// Method to build the full JPS path to the grid.

export default function buildJPSPath(
	width: number,
	shortestPath?: number[] | null
) {
	if (shortestPath) {
		let fullPath: number[] = [];

		for (let i = 0; i < shortestPath.length - 1; i++) {
			const from = shortestPath[i];
			const to = shortestPath[i + 1];

			if (heuristicEuclidean(from, to, width) >= 2) {
				if (isDiagonal(from, to, width)) {
					const fromRow = Math.floor(from / width);
					const fromCol = from % width;
					const toRow = Math.floor(to / width);
					const toCol = to % width;

					const rowDirection = fromRow < toRow ? 1 : -1;
					const colDirection = fromCol < toCol ? 1 : -1;

					let index = from + rowDirection * width + colDirection;

					fullPath.push(index);

					while (true) {
						index = index + rowDirection * width + colDirection;

						if (index === to) {
							break;
						} else {
							fullPath.push(index);
						}
					}
				} else {
					if (Math.floor(from / width) === Math.floor(to / width)) {
						if (from < to) {
							for (let i = from + 1; i < to; i++) {
								fullPath.push(i);
							}
						} else {
							for (let i = from - 1; i > to; i--) {
								fullPath.push(i);
							}
						}
					} else {
						if (from < to) {
							for (let i = from + width; i < to; i += width) {
								fullPath.push(i);
							}
						} else {
							for (let i = from - width; i > to; i -= width) {
								fullPath.push(i);
							}
						}
					}
				}
			}
		}

		if (fullPath.length > 0) {
			return fullPath;
		}
	}

	return null;
}
