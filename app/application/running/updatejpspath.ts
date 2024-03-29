"use client";

// Method to draw the full JPS path to the grid.
// Color all visited nodes and restore the start and end points.

export default function updateJPSPath(
	fieldStatus: number[],
	setRunFieldStatus: (value: number[]) => void,
	visitedList: { [node: number]: boolean },
	start: number,
	end: number,
	shortestPath?: number[] | null,
	fullJPSPath?: number[] | null
) {
	const tmp = [...fieldStatus];

	for (let node in visitedList) {
		if (visitedList[node] === true) {
			tmp[node] = 4;

			if (shortestPath && shortestPath.includes(parseInt(node, 10))) {
				tmp[node] = 5;
			}
		}
	}

	if (fullJPSPath && fullJPSPath.length > 0) {
		for (const node in fullJPSPath) {
			tmp[fullJPSPath[node]] = 6;
		}
	}

	tmp[start] = 2;
	tmp[end] = 3;

	setRunFieldStatus(tmp);
}
