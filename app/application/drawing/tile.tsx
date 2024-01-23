"use client";

import { useState } from "react";

interface TileProps {
	index: number;
	zoom: number;
	status: number;
	mouseState: boolean;
	tileClick: (index: number) => void;
}

const Tile: React.FC<TileProps> = ({
	index,
	status,
	zoom,
	mouseState,
	tileClick,
}) => {
	let bgColor = "transparent";

	if (status === 1) {
		bgColor = "bg-stone-500";
	} else if (status === 2) {
		bgColor = "bg-indigo-500";
	} else if (status === 3) {
		bgColor = "bg-green-500";
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

	const handlePaint = () => {
		if (mouseState === true) {
			tileClick(index);
		}
	};

	const realClick = () => {
		tileClick(index);
	};

	return (
		<div
			onMouseEnter={handlePaint}
			onClick={realClick}
			className={`border rounded flex items-center justify-center p-2 cursor-pointer ${bgColor} ${size}`}
		></div>
	);
};

export default Tile;
