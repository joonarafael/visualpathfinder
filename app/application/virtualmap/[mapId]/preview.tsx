"use client";

interface PreviewProps {
	map: number[];
	width: number;
	height: number;
}

const Preview: React.FC<PreviewProps> = ({ map, width, height }) => {
	let rows: string[] = [];

	for (let i = 0; i < map.length; i += width) {
		const chunk = map.slice(i, i + width).join("");

		rows.push(chunk.replaceAll("0", "_").replaceAll("1", "#"));
	}

	return (
		<div className="flex flex-col text-justify text-[8px]">
			{rows.map((row, index) => (
				<span key={index}>{row}</span>
			))}
		</div>
	);
};

export default Preview;
