"use client";

// Tool selection menu (drawing mode).

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

	const commonCSS = `text-lg hover:pl-4 hover:underline rounded border p-2`;

	return (
		<div className="flex flex-col p-2 gap-2 w-full">
			<Button
				onClick={() => {
					setApplicationState("run");
				}}
				className="font-bold"
				variant="outline"
			>
				VIEW PREVIOUS RUN
			</Button>
			<hr />
			<div className="font-light text-neutral-500 text-xs">SELECTED TOOL</div>
			<div className="font-bold text-2xl">{tool}</div>
			<hr />
			<div className="font-light text-neutral-500 text-xs">TOOL SELECTION</div>
			<div className="flex flex-col gap-3">
				<Button
					onClick={() => handleToolChange("START")}
					className="flex w-full p-0 text-left"
					variant="ghost"
				>
					<div className={`${commonCSS} border-indigo-500 w-full`}>START</div>
				</Button>
				<Button
					onClick={() => handleToolChange("FINISH")}
					className="flex w-full p-0 text-left"
					variant="ghost"
				>
					<div className={`${commonCSS} border-green-500 w-full`}>FINISH</div>
				</Button>
				<Button
					onClick={() => handleToolChange("ERASER")}
					className="flex w-full p-0 text-left"
					variant="ghost"
				>
					<div className={`${commonCSS} border-pink-500 w-full`}>ERASER</div>
				</Button>
				<Button
					onClick={() => handleToolChange("WALL")}
					className="flex w-full p-0 text-left"
					variant="ghost"
				>
					<div className={`${commonCSS} border-slate-500 w-full`}>WALL</div>
				</Button>
			</div>
		</div>
	);
};

export default ToolBar;
