"use client";

interface RunBarProps {

}

const RunBar: React.FC<RunBarProps> = ({}) => {
	const commonCSS = `text-lg rounded border p-2`;

	return (
		<div className="flex flex-col p-2 gap-2 w-full">
			<div className="font-light text-neutral-500 text-xs">CURRENT ALGORITHM</div>
			<div className="font-bold text-2xl">N/A</div>
			<hr />
			<div className="font-light text-neutral-500 text-xs">RECENT RUNS</div>
			<div
				className={`${commonCSS} border-indigo-500`}
			>
				DIJKSTRA
			</div>
			<div
				className={`${commonCSS} border-green-500`}
			>
				A*
			</div>
			<div className={`${commonCSS}`}>
				JPS
			</div>
		</div>
	);
};

export default RunBar;
