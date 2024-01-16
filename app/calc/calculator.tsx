"use client";

import { useEffect, useState } from "react";
import { Scrollbars } from "react-custom-scrollbars-2";

import Container from "../components/container";
import Matrix from "./matrix";
import Menu from "./menu";
import ToolBar from "./toolbar";

interface CalculatorProps {
	width: number;
	height: number;
}

const Calculator: React.FC<CalculatorProps> = ({ width, height }) => {
	const field = Array.from({ length: height * 2 - 1 }, (_, rowIndex) =>
		Array.from(
			{ length: width * 2 - 1 },
			(_, colIndex) => rowIndex * width + colIndex
		)
	);

	const [fieldStatus, setFieldStatus] = useState(() => {
		return Array.from({ length: height * 2 - 1 }, (_, rowIndex) =>
			Array.from({ length: width * 2 - 1 }, (_, colIndex) => 0)
		);
	});

	const [zoom, setZoom] = useState(4);

	const [tool, setTool] = useState("entry");

	const [selectedBoreHole, setSelectedBoreHole] = useState<number | null>(null);

	const boreHoleClick = (coords: number[]) => {
		if (tool === "entry") {
			updateFieldValue(coords, -1);
		}
	};

	const updateFieldValue = (coords: number[], newValue: number) => {
		if (tool === "entry") {
			setFieldStatus((prevFieldStatus) => {
				const newFieldStatus = [...prevFieldStatus];
				newFieldStatus[coords[0]] = [...newFieldStatus[coords[0]]];
				newFieldStatus[coords[0]][coords[1]] = newValue;

				return newFieldStatus;
			});
		}

		// logic to make a connection!

		setSelectedBoreHole(coords[2]);
	};

	useEffect(() => {
		setSelectedBoreHole(null);
	}, [tool]);

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
								fieldStatus={fieldStatus}
								zoom={zoom}
								selectedBoreHole={selectedBoreHole}
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

export default Calculator;
