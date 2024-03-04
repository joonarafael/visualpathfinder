"use client";

interface XAxisProps {
	width: number;
}

const XAxis: React.FC<XAxisProps> = ({ width }) => {
	const pad = (num: number, size: number) => {
		let s = "000000000" + num;
		return s.substr(s.length - size);
	};

	const generateXAxis = () => {
		let axis = `     0000`;
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

	return (
		<div
			className={`flex flex-col text-justify text-[11px] p-2 font-bold text-indigo-500`}
			style={{ userSelect: "none" }}
		>
			<pre>{generateXAxis()}</pre>
		</div>
	);
};

export default XAxis;
