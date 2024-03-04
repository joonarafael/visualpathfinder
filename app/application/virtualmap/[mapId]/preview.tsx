"use client";

// Handles the rendering of the virtual map.

interface PreviewProps {
	map: number[];
	width: number;
}

const Preview: React.FC<PreviewProps> = ({ map, width }) => {
	let rows: string[] = [];

	const pad = (num: number, size: number) => {
		let s = "000000000" + num;
		return s.substr(s.length - size);
	};

	for (let i = 0; i < map.length; i += width) {
		const chunk = map.slice(i, i + width).join("");
		const row = chunk.replaceAll("0", "_").replaceAll("1", "#");

		rows.push(row);
	}

	return (
		<div
			className={`flex flex-col text-justify text-[11px] text-zinc-300`}
			style={{ userSelect: "none" }}
		>
			{rows.map((row, index) => (
				<span key={index}>
					<pre>{`${row} `}</pre>
				</span>
			))}
		</div>
	);
};

export default Preview;
