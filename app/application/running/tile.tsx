"use client";

// Individual tile elements for the "run" grid.

interface RunTileProps {
	index: number;
	zoom: number;
	status: number;
	smoothing: boolean;
	contrast: boolean;
	indexing: boolean;
}

const RunTile: React.FC<RunTileProps> = ({
	smoothing,
	index,
	status,
	zoom,
	contrast,
	indexing,
}) => {
	let bgColor = "transparent";

	if (status === 1) {
		if (contrast) {
			bgColor = "bg-foreground";
		} else {
			bgColor = "bg-foreground/50";
		}
	} else if (status === 2) {
		bgColor = "bg-indigo-500";
	} else if (status === 3) {
		bgColor = "bg-green-500";
	} else if (status === 4) {
		bgColor = "bg-foreground/25";
	} else if (status === 5) {
		if (contrast) {
			bgColor = "bg-pink-500";
		} else {
			bgColor = "bg-sky-500";
		}
	} else if (status === 6) {
		if (contrast) {
			bgColor = "bg-pink-800";
		} else {
			bgColor = "bg-emerald-800";
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

	if (indexing && zoom > 3) {
		return (
			<div
				className={`${
					smoothing && "border rounded"
				} flex items-center justify-center p-2 ${bgColor} ${size} text-xs ${
					contrast && status !== 0 && status !== 4 && "text-background "
				}`}
			>
				{index}
			</div>
		);
	}

	return (
		<div
			className={`${
				smoothing && "border rounded"
			} flex items-center justify-center p-2 ${bgColor} ${size}`}
		></div>
	);
};

export default RunTile;
