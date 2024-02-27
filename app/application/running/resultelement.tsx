"use client";

interface ResultElementProps {
	name: string;
	data: { time: number; visited_nodes: number; path_length: string };
}

const ResultElement: React.FC<ResultElementProps> = ({ name, data }) => {
	const commonCSS = `text-lg rounded border p-2 font-semibold`;

	return (
		<div
			className={`${commonCSS} ${
				name === "dijkstra"
					? "border-indigo-500"
					: name === "a*"
					? "border-green-500"
					: "border-orange-500"
			}`}
		>
			{name.toUpperCase()}
			<hr className="mt-1 py-1" />
			<div className="flex flex-col gap-1 font-light">
				<p className="text-neutral-500 text-xs">RUNTIME</p>
				<p>{data.time} ms</p>
				<p className="text-neutral-500 text-xs">NODES VISITED</p>
				<p>{data.visited_nodes}</p>
				{data.path_length !== "0" ? (
					<>
						<p className="text-neutral-500 text-xs">PATH LENGTH</p>
						<p>{data.path_length}</p>
					</>
				) : (
					<p className="text-rose-500 text-xs">FINISH NOT FOUND</p>
				)}
			</div>
		</div>
	);
};

export default ResultElement;
