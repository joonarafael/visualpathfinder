"use client";

// Sidebar for the run statistics.

import { Button } from "@/app/components/ui/button";

interface RunBarProps {
	algorithm: string;
	runsStats: any;
	setApplicationState: (view: string) => void;
	showNote: number;
	setShowNote: (value: number) => void;
}

const RunBar: React.FC<RunBarProps> = ({
	algorithm,
	runsStats,
	setApplicationState,
	showNote,
	setShowNote,
}) => {
	const commonCSS = `text-lg rounded border p-2 font-semibold`;

	const resultElement = (
		name: string,
		data: { time: number; visited_nodes: number; path_length: string }
	) => {
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

	const notRunElement = (name: string) => {
		return (
			<div className={`${commonCSS} border-neutral-500`}>
				{name.toUpperCase()}
				<hr className="mt-1 py-1" />
				<div className="flex flex-col gap-1 font-light">
					<p className="text-neutral-500 text-xs">NOT RUN YET</p>
					<p className="text-neutral-500 text-xs">
						EXECUTE FROM <br />
						{`File > Run Algorithm ...`}
					</p>
				</div>
			</div>
		);
	};

	return (
		<div className="flex flex-col p-2 gap-2 w-full">
			<Button
				onClick={() => {
					setApplicationState("draw");
				}}
				className="font-bold"
				variant={"secondary"}
			>
				EDIT GRID
			</Button>
			<hr />
			<div className="font-light text-neutral-500 text-xs">ALGORITHM</div>
			<div className="font-bold text-2xl">{algorithm.toUpperCase()}</div>
			<hr />
			<div className="font-light text-neutral-500 text-xs">COMPARE</div>
			{showNote === 0 ? (
				<div
					className={`${commonCSS} flex flex-col border-yellow-500 content-center text-rose-500`}
				>
					NOTE
					<hr className="mt-1 py-1" />
					<div className="flex flex-col gap-1 font-light">
						<p className="text-neutral-500 text-xs">
							ALGORITHMS ARE RUN ON THE CLIENT MACHINE. THESE PERFORMANCE
							CALCULATIONS HEAVILY DEPEND ON YOUR SYSTEM AND BROWSER.
						</p>
					</div>
					<hr className="mt-1 py-1" />
					<Button
						onClick={() => {
							setShowNote(1);
						}}
						className="font-bold"
						variant={"destructive"}
					>
						YES I KNOW
					</Button>
				</div>
			) : (
				showNote === 1 && (
					<div
						className={`${commonCSS} flex flex-col border-yellow-500 content-center text-rose-500`}
					>
						NOTE
						<hr className="mt-1 py-1" />
						<div className="flex flex-col gap-1 font-light">
							<p className="text-neutral-500 text-xs">
								PREVIOUS RUN RECORDS WILL BE STORED HERE. HOWEVER, EDITING THE
								GRID AND RERUNNING AN ALGORITHM WILL RESET ALL STATISTICS.
							</p>
						</div>
						<hr className="mt-1 py-1" />
						<Button
							onClick={() => {
								setShowNote(2);
							}}
							className="font-bold"
							variant={"destructive"}
						>
							FINE BY ME
						</Button>
					</div>
				)
			)}
			{runsStats.dijkstra.visited_nodes > 0
				? resultElement("dijkstra", {
						time: runsStats.dijkstra.time,
						visited_nodes: runsStats.dijkstra.visited_nodes,
						path_length: runsStats.dijkstra.path_length,
				  })
				: notRunElement("dijkstra")}
			{runsStats.a_star.visited_nodes > 0
				? resultElement("a*", {
						time: runsStats.a_star.time,
						visited_nodes: runsStats.a_star.visited_nodes,
						path_length: runsStats.a_star.path_length,
				  })
				: notRunElement("a*")}
			{runsStats.jps.visited_nodes > 0
				? resultElement("jps", {
						time: runsStats.jps.time,
						visited_nodes: runsStats.jps.visited_nodes,
						path_length: runsStats.jps.path_length,
				  })
				: notRunElement("jps")}
			{showNote === 2 && (
				<div
					className={`${commonCSS} flex flex-col border-emerald-500 content-center text-green-500`}
				>
					TIP
					<hr className="mt-1 py-1" />
					<div className="flex flex-col gap-1 font-light">
						<p className="text-neutral-500 text-xs">
							{`"EUCLIDEAN PATH LENGTH" (WHERE DIAGONALS SQRT(2)) IS GIVEN WITHIN
							PARENTHESES. THE FIRST NUMBER IS THE AMOUNT OF TRAVERSED NODES.`}
						</p>
					</div>
					<hr className="mt-1 py-1" />
					<Button
						onClick={() => {
							setShowNote(3);
						}}
						className="font-bold"
						variant={"secondary"}
					>
						I GET IT
					</Button>
				</div>
			)}
		</div>
	);
};

export default RunBar;
