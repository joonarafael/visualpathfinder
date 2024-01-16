"use client";

interface ToolBarProps {
	tool: string;
	setTool: (tool: string) => void;
}

const ToolBar: React.FC<ToolBarProps> = ({ tool, setTool }) => {
	const handleToolChange = (tool: string) => {
		setTool(tool);
	};

	const commonCSS = `cursor-pointer text-lg hover:pl-4 hover:underline rounded border p-2`;

	return (
		<div className="flex flex-col p-2 gap-2 w-full">
			<div className="font-light text-neutral-500 text-xs">SELECTED TOOL</div>
			<div className="font-bold text-2xl">{tool}</div>
			<hr />
			<div className="font-light text-neutral-500 text-xs">TOOL SELECTION</div>
			<div className={commonCSS} onClick={() => handleToolChange("START")}>
				START
			</div>
			<div className={commonCSS} onClick={() => handleToolChange("FINISH")}>
				FINISH
			</div>
			<div className={commonCSS} onClick={() => handleToolChange("PATH")}>
				PATH
			</div>
			<div className={commonCSS} onClick={() => handleToolChange("WALL")}>
				WALL
			</div>
		</div>
	);
};

export default ToolBar;
