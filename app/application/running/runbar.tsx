"use client";

import { useState } from "react";
import { FaPlay } from "react-icons/fa";

import { Button } from "@/app/components/ui/button";

interface RunBarProps {
	algorithm: string;
}

const RunBar: React.FC<RunBarProps> = ({ algorithm }) => {
	const commonCSS = `text-lg rounded border p-2 cursor-pointer hover:underline hover:pl-3`;

	const [infoPanel, setInfoPanel] = useState<string | null>(null);

	const clickDijkstra = () => {
		if (infoPanel === "dijkstra") {
			setInfoPanel(null);
		} else {
			setInfoPanel("dijkstra");
		}
	};

	return (
		<div className="flex flex-col p-2 gap-2 w-full">
			<div className="font-light text-neutral-500 text-xs">
				CURRENT ALGORITHM
			</div>
			<div className="font-bold text-2xl">{algorithm.toUpperCase()}</div>
			<hr />
			<div className="font-light text-neutral-500 text-xs">
				VIEW RECENT RUNS
			</div>
			<div onClick={clickDijkstra} className={`${commonCSS} border-indigo-500`}>
				DIJKSTRA
			</div>
			{infoPanel === "dijkstra" && (
				<div className="flex flex-col gap-1 py-1 border rounded-lg p-2">
					<p className="font-light text-neutral-500 text-xs">RUNTIME</p>
					<p>N/A</p>
					<p className="font-light text-neutral-500 text-xs">NODES VISITED</p>
					<p>N/A</p>
					<Button
						className="flex flex-row gap-2"
						disabled
						variant={"secondary"}
					>
						PLAY <FaPlay />
					</Button>
				</div>
			)}
			<div className={`${commonCSS} border-green-500`}>A*</div>
			<div className={`${commonCSS} border-orange-500`}>JPS</div>
		</div>
	);
};

export default RunBar;
