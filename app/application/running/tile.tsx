"use client";

import { useState } from "react";

interface RunTileProps {
	index: number;
	zoom: number;
	status: number;
}

const RunTile: React.FC<RunTileProps> = ({ index, status, zoom }) => {
	let bgColor = "transparent";

	if (status === 1) {
		bgColor = "bg-stone-500";
	} else if (status === 2) {
		bgColor = "bg-indigo-500";
	} else if (status === 3) {
		bgColor = "bg-green-500";
	} else if (status === 4) {
		bgColor = "bg-orange-800";
	}

	let size = "min-w-4 min-h-4";

	if (zoom === 2) {
		size = "min-w-8 min-h-8";
	} else if (zoom === 3) {
		size = "min-w-10 min-h-10";
	} else if (zoom === 4) {
		size = "min-w-14 min-h-14";
	} else if (zoom === 5) {
		size = "min-w-20 min-h-20";
	} else if (zoom === 6) {
		size = "min-w-24 min-h-24";
	}

	return (
		<div
			className={`border rounded flex items-center justify-center p-2 ${bgColor} ${size}`}
		></div>
	);
};

export default RunTile;
