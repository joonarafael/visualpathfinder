"use client";

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

	const xAxis = () => {
		let axis = `0000`;
		let index = 0;

		while (true) {
			index += 25;

			if (index > width) {
				break;
			}

			axis += `                     ${pad(index, 4)}`;
		}

		return axis;
	};

	rows.push(xAxis());

	for (let i = 0; i < map.length; i += width) {
		const chunk = map.slice(i, i + width).join("");
		const row = chunk.replaceAll("0", "_").replaceAll("1", "#");

		rows.push(row);
	}

	rows.push(xAxis());

	return (
		<div
			className={`flex flex-col text-justify text-[11px] p-2`}
			style={{ userSelect: "none" }}
		>
			{rows.map((row, index) => (
				<span key={index}>
					{(index - 1) % 25 === 0 ? (
						<>
							<pre>
								{pad(index - 1, 4)}
								{` ${row} `}
								{pad(index - 1, 4)}
							</pre>
						</>
					) : (
						<>
							<pre>{`     ${row}     `}</pre>
						</>
					)}
				</span>
			))}
		</div>
	);
};

export default Preview;
