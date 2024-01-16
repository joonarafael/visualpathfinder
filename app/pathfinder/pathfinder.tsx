"use client";

import { useEffect, useState } from "react";

import Container from "../components/container";
import Matrix from "./matrix";
import Menu from "./menu";
import ToolBar from "./toolbar";

interface PathFinderProps {
	width: number;
	height: number;
}

const PathFinder: React.FC<PathFinderProps> = ({ width, height }) => {
	const field = Array.from({ length: height }, (_, rowIndex) =>
		Array.from({ length: width }, (_, colIndex) => rowIndex * width + colIndex)
	);

	const [zoom, setZoom] = useState(4);

	const [tool, setTool] = useState("START");

	const boreHoleClick = (coords: number[]) => {
		return;
	};

	return (
		<Container>
			<div className="flex flex-col gap-4">
				<Menu zoom={zoom} setZoom={setZoom} />
				<div className="flex flex-row gap-4">
					<div className="border rounded-lg w-5/6 h-[80svh] overflow-scroll">
						<div className="w-max">
							<Matrix
								width={width}
								height={height}
								field={field}
								zoom={zoom}
								boreHoleClick={boreHoleClick}
							/>
						</div>
					</div>
					<div className="border rounded-lg w-1/6">
						<div className="w-full">
							<ToolBar tool={tool} setTool={setTool} />
						</div>
					</div>
				</div>
			</div>
		</Container>
	);
};

export default PathFinder;
