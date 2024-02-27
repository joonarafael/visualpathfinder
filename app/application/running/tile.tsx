"use client";

// Individual tile elements for the "run" grid.

interface RunTileProps {
	index: number;
	zoom: number;
	status: number;
	smoothing: boolean;
	contrast: boolean;
}

const RunTile: React.FC<RunTileProps> = ({
	smoothing,
	index,
	status,
	zoom,
	contrast,
}) => {
	let bgColor = "transparent";

	if (status === 1) {
		if (contrast) {
			bgColor = "bg-stone-300";
		} else {
			bgColor = "bg-stone-500";
		}
	} else if (status === 2) {
		bgColor = "bg-indigo-500";
	} else if (status === 3) {
		bgColor = "bg-green-500";
	} else if (status === 4) {
		if (contrast) {
			bgColor = "bg-zinc-700";
		} else {
			bgColor = "bg-zinc-800";
		}
	} else if (status === 5) {
		if (contrast) {
			bgColor = "bg-pink-500";
		} else {
			bgColor = "bg-sky-500";
		}
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
			className={`${
				smoothing && "border rounded"
			} flex items-center justify-center p-2 ${bgColor} ${size} text-xs`}
		></div>
	);
};

export default RunTile;
