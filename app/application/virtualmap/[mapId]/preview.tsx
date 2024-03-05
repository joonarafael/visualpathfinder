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
		const row = chunk
			.replaceAll("0", " ")
			.replaceAll("1", "_")
			.replace("2", "S")
			.replace("3", "F");

		rows.push(row);
	}

	rows.push(" ");

	return (
		<div
			className={`flex flex-col text-justify text-[11px]`}
			style={{ userSelect: "none" }}
		>
			{rows.map((row, index) => (
				<span key={index}>
					<pre>{`     ${row} `}</pre>
				</span>
			))}
		</div>
	);
};

export default Preview;
