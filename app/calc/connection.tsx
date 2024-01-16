"use client";

interface ConnectionProps {
	index: number;
	zoom: number;
}

const Connection: React.FC<ConnectionProps> = ({ index, zoom }) => {
	const commonCSS = `flex items-center justify-center p-2`;

	if (zoom === 1) {
		return (
			<div className={`${commonCSS} min-w-10 min-h-10`}>
				<div className="text-xs">c</div>
			</div>
		);
	}

	if (zoom === 2) {
		return (
			<div className={`${commonCSS} min-w-14 min-h-14`}>
				<div className="text-sm">c</div>
			</div>
		);
	}

	if (zoom === 3) {
		return (
			<div className={`${commonCSS} min-w-20 min-h-20`}>
				<div className="text-base">c</div>
			</div>
		);
	}

	if (zoom === 4) {
		return (
			<div className={`${commonCSS} min-w-24 min-h-24`}>
				<div>c</div>
			</div>
		);
	}

	if (zoom === 5) {
		return (
			<div className={`${commonCSS} min-w-28 min-h-28`}>
				<div>c</div>
			</div>
		);
	}

	return (
		<div className={`${commonCSS} min-w-36 min-h-36`}>
			<div>0</div>
		</div>
	);
};

export default Connection;
