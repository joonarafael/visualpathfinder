"use client";

import { useEffect, useState } from "react";

import Container from "../components/container";
import Matrix from "./matrix";
import Menu from "./menu";
import ToolBar from "./toolbar";
import RunBar from "./runbar";

const PathFinder = () => {
	const [applicationState, setApplicationState] = useState("draw");

	const field = Array.from({ length: 64 * 64 }, (_, index) => index);
	const [fieldStatus, setFieldStatus] = useState(
		Array.from({ length: 64 * 64 }, (_, index) => 0)
	);

	const [zoom, setZoom] = useState(4);
	const [tool, setTool] = useState("START");

	const tileClick = (index: number) => {
		if (tool === "START") {
			let tmp = fieldStatus;

			const prevStart = tmp.indexOf(2);

			if (prevStart !== -1) {
				tmp[prevStart] = 0;
			}

			if (tmp[index] !== 3) {
				tmp[index] = 2;
				setFieldStatus(tmp);
			}
		} else if (tool === "FINISH") {
			let tmp = fieldStatus;

			const prevStart = tmp.indexOf(3);

			if (prevStart !== -1) {
				tmp[prevStart] = 0;
			}

			if (tmp[index] !== 2) {
				tmp[index] = 3;
				setFieldStatus(tmp);
			}
		} else if (tool === "PATH") {
			let tmp = fieldStatus;

			if (tmp[index] === 1) {
				tmp[index] = 0;
				setFieldStatus(tmp);
			}
		} else if (tool === "WALL") {
			let tmp = fieldStatus;
			if (tmp[index] === 0) {
				tmp[index] = 1;
				setFieldStatus(tmp);
			}
		}
	};

	const runDijkstra = () => {}

	return (
		<Container>
			<div className="flex flex-col gap-4">
				<Menu zoom={zoom} setZoom={setZoom} setFieldStatus={setFieldStatus} applicationState={applicationState} setApplicationState={setApplicationState} dijkstra={runDijkstra} />
				<div className="flex flex-row gap-4">
					<div className="border rounded-lg w-5/6 h-[80svh] overflow-scroll">
						<div className="w-max">
							{applicationState === "draw" && (
								<Matrix
								width={64}
								height={64}
								field={field}
								fieldStatus={fieldStatus}
								zoom={zoom}
								tileClick={tileClick}
							/>
							)}
							{applicationState === "run" && (
								
								<div>Mitös vuttyua</div>
							)}
						</div>
					</div>
					<div className="border rounded-lg w-1/6">
						<div className="w-full">
							{applicationState === "draw" ? (
								<ToolBar tool={tool} setTool={setTool} />
							) : (
								<RunBar />
							)}
						</div>
					</div>
				</div>
			</div>
		</Container>
	);
};

export default PathFinder;
