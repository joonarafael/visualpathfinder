"use client";

// This module renders the grid map during the algorithm run.

import RunTile from "./tile";

interface RunMatrixProps {
	width: number;
	height: number;
	field: number[];
	fieldStatus: number[];
	zoom: number;
	smoothing: boolean;
	contrast: boolean;
}

const RunMatrix: React.FC<RunMatrixProps> = ({
	width,
	height,
	field,
	fieldStatus,
	zoom,
	smoothing,
	contrast,
}) => {
	return (
		<div className="flex flex-col p-2">
			{Array.from({ length: height }).map((_, rowIndex) => (
				<div key={rowIndex} className="flex">
					{Array.from({ length: width }).map((_, colIndex) => {
						const index = rowIndex * width + colIndex;
						const item = field[index];

						return (
							<div key={colIndex}>
								<RunTile
									smoothing={smoothing}
									status={fieldStatus[index]}
									index={item}
									zoom={zoom}
									contrast={contrast}
								/>
							</div>
						);
					})}
				</div>
			))}
		</div>
	);
};

export default RunMatrix;
