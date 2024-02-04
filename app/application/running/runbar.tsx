"use client";

import { Button } from '@/app/components/ui/button';

interface RunBarProps {
	algorithm: string;
	runsStats: any;
	setApplicationState: (view: string) => void;
	showNote: boolean;
	setShowNote: (value: boolean) => void;
}

const RunBar: React.FC<RunBarProps> = ({
	algorithm,
	runsStats,
	setApplicationState,
	showNote,
	setShowNote,
}) => {
	const commonCSS = `text-lg rounded border p-2 font-semibold`;

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
			<div className="font-light text-neutral-500 text-xs">
				COMPARE TO OTHERS
			</div>
			{showNote && (
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
							setShowNote(false);
						}}
						className="font-bold"
						variant={"destructive"}
					>
						OKAY
					</Button>
				</div>
			)}
			<div className={`${commonCSS} border-indigo-500`}>
				DIJKSTRA
				<hr className="mt-1 py-1" />
				<div className="flex flex-col gap-1 font-light">
					<p className="text-neutral-500 text-xs">RUNTIME</p>
					<p>{runsStats.dijkstra.time} ms</p>
					<p className="text-neutral-500 text-xs">NODES VISITED</p>
					<p>{runsStats.dijkstra.visited_nodes}</p>
				</div>
			</div>
			<div className={`${commonCSS} border-green-500`}>
				A*
				<hr className="mt-1 py-1" />
				<div className="flex flex-col gap-1 font-light">
					<p className="text-neutral-500 text-xs">RUNTIME</p>
					<p>{runsStats.a_star.time} ms</p>
					<p className="text-neutral-500 text-xs">NODES VISITED</p>
					<p>{runsStats.a_star.visited_nodes}</p>
				</div>
			</div>
			<div className={`${commonCSS} border-orange-500`}>
				JPS
				<hr className="mt-1 py-1" />
				<div className="flex flex-col gap-1 font-light">
					<p className="text-neutral-500 text-xs">RUNTIME</p>
					<p>{runsStats.jps.time} ms</p>
					<p className="text-neutral-500 text-xs">NODES VISITED</p>
					<p>{runsStats.jps.visited_nodes}</p>
				</div>
			</div>
		</div>
	);
};

export default RunBar;
