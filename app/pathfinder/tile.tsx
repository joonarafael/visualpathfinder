"use client";

interface TileProps {
	index: number;
	coords: number[];
	zoom: number;
	boreHoleClick: (coords: number[]) => void;
}

const Tile: React.FC<TileProps> = ({ index, coords, zoom, boreHoleClick }) => {
	const commonCSS = `border rounded-full flex items-center justify-center p-2 cursor-pointer`;

	const handleClick = () => {
		boreHoleClick([coords[0], coords[1], index]);
	};

	if (zoom === 1) {
		return (
			<div onClick={handleClick} className={`${commonCSS} min-w-10 min-h-10`}>
				<div className="text-xs">{index}</div>
			</div>
		);
	}

	if (zoom === 2) {
		return (
			<div onClick={handleClick} className={`${commonCSS} min-w-14 min-h-14`}>
				<div className="text-sm">{index}</div>
			</div>
		);
	}

	if (zoom === 3) {
		return (
			<div onClick={handleClick} className={`${commonCSS} min-w-20 min-h-20`}>
				<div className="text-base">{index}</div>
			</div>
		);
	}

	if (zoom === 4) {
		return (
			<div onClick={handleClick} className={`${commonCSS} min-w-24 min-h-24`}>
				<div>{index}</div>
			</div>
		);
	}

	if (zoom === 5) {
		return (
			<div onClick={handleClick} className={`${commonCSS} min-w-28 min-h-28`}>
				<div>{index}</div>
			</div>
		);
	}

	return (
		<div onClick={handleClick} className={`${commonCSS} min-w-36 min-h-36`}>
			<div>{index}</div>
		</div>
	);
};

export default Tile;
