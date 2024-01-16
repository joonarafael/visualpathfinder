"use client";

interface BoreHoleProps {
	index: number;
	status: number;
	coords: number[];
	zoom: number;
	selectedBoreHole?: number | null;
	boreHoleClick: (coords: number[]) => void;
}

const BoreHole: React.FC<BoreHoleProps> = ({
	index,
	coords,
	status,
	zoom,
	selectedBoreHole,
	boreHoleClick,
}) => {
	const commonCSS = `border rounded-full flex items-center justify-center p-2 cursor-pointer ${
		selectedBoreHole === index
			? `text-red-200 bg-red-700`
			: `hover:text-red-200 hover:bg-red-700`
	}`;

	const handleClick = () => {
		boreHoleClick([coords[0], coords[1], index]);
	};

	if (zoom === 1) {
		return (
			<div onClick={handleClick} className={`${commonCSS} min-w-10 min-h-10`}>
				<div className="text-xs">{status}</div>
			</div>
		);
	}

	if (zoom === 2) {
		return (
			<div onClick={handleClick} className={`${commonCSS} min-w-14 min-h-14`}>
				<div className="text-sm">{status}</div>
			</div>
		);
	}

	if (zoom === 3) {
		return (
			<div onClick={handleClick} className={`${commonCSS} min-w-20 min-h-20`}>
				<div className="text-base">{status}</div>
			</div>
		);
	}

	if (zoom === 4) {
		return (
			<div onClick={handleClick} className={`${commonCSS} min-w-24 min-h-24`}>
				<div>{status}</div>
			</div>
		);
	}

	if (zoom === 5) {
		return (
			<div onClick={handleClick} className={`${commonCSS} min-w-28 min-h-28`}>
				<div>{status}</div>
			</div>
		);
	}

	return (
		<div onClick={handleClick} className={`${commonCSS} min-w-36 min-h-36`}>
			<div>{status}</div>
		</div>
	);
};

export default BoreHole;
