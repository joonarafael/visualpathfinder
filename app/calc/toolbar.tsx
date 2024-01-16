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
			<div className={commonCSS} onClick={() => handleToolChange("entry")}>
				Entry
			</div>
			<div className={commonCSS} onClick={() => handleToolChange("0")}>
				0 ms
			</div>
			<div className={commonCSS} onClick={() => handleToolChange("9")}>
				9 ms
			</div>
			<div className={commonCSS} onClick={() => handleToolChange("17")}>
				17 ms
			</div>
			<div className={commonCSS} onClick={() => handleToolChange("25")}>
				25 ms
			</div>
			<div className={commonCSS} onClick={() => handleToolChange("42")}>
				42 ms
			</div>
			<div className={commonCSS} onClick={() => handleToolChange("67")}>
				67 ms
			</div>
			<div className={commonCSS} onClick={() => handleToolChange("109")}>
				109 ms
			</div>
		</div>
	);
};

export default ToolBar;
