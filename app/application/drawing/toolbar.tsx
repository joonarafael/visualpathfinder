"use client";

import { Button } from "@/app/components/ui/button";

interface ToolBarProps {
	tool: string;
	setTool: (tool: string) => void;
	setApplicationState: (view: string) => void;
}

const ToolBar: React.FC<ToolBarProps> = ({
	tool,
	setTool,
	setApplicationState,
}) => {
	const handleToolChange = (tool: string) => {
		setTool(tool);
	};

	const commonCSS = `cursor-pointer text-lg hover:pl-4 hover:underline rounded border p-2`;

	return (
		<div className="flex flex-col p-2 gap-2 w-full">
			<Button
				onClick={() => {
					setApplicationState("run");
				}}
				className="font-bold"
				variant={"secondary"}
			>
				VIEW PREVIOUS RUN
			</Button>
			<hr />
			<div className="font-light text-neutral-500 text-xs">SELECTED TOOL</div>
			<div className="font-bold text-2xl">{tool}</div>
			<hr />
			<div className="font-light text-neutral-500 text-xs">TOOL SELECTION</div>
			<div
				className={`${commonCSS} border-indigo-500`}
				onClick={() => handleToolChange("START")}
			>
				START
			</div>
			<div
				className={`${commonCSS} border-green-500`}
				onClick={() => handleToolChange("FINISH")}
			>
				FINISH
			</div>
			<div
				className={`${commonCSS} border-pink-500`}
				onClick={() => handleToolChange("ERASER")}
			>
				ERASER
			</div>
			<div
				className={`${commonCSS} border-slate-500`}
				onClick={() => handleToolChange("WALL")}
			>
				WALL
			</div>
		</div>
	);
};

export default ToolBar;
