"use client";

export default function updateUserView(
	fieldStatus: number[],
	setRunFieldStatus: (value: number[]) => void,
	visitedList: { [node: number]: boolean },
	start: number,
	end: number,
	shortestPath?: number[] | null
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

	tmp[start] = 2;
	tmp[end] = 3;

	setRunFieldStatus(tmp);
}
