"use client";

interface YAxisProps {
	height: number;
}

const YAxis: React.FC<YAxisProps> = ({ height }) => {
	const pad = (num: number, size: number) => {
		let s = "000000000" + num;
		return s.substr(s.length - size);
	};

	let rows: string[] = [];

	for (let i = 0; i < height; i += 1) {
		if (i % 25 === 0) {
			rows.push(`${pad(i, 4)} `);
		} else {
			rows.push(" ");
		}
	}

	return (
		<div
			className={`flex flex-col text-justify text-[11px] font-bold text-sky-500`}
			style={{ userSelect: "none" }}
		>
			{rows.map((row, index) => (
				<span key={index}>
					<pre>{row}</pre>
				</span>
			))}
		</div>
	);
};

export default YAxis;
