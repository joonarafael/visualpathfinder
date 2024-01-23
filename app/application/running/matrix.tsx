"use client";

import RunTile from "./tile";

interface RunMatrixProps {
	width: number;
	height: number;
	field: number[];
	fieldStatus: number[];
	zoom: number;
}

const RunMatrix: React.FC<RunMatrixProps> = ({
	width,
	height,
	field,
	fieldStatus,
	zoom,
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
								<RunTile status={fieldStatus[index]} index={item} zoom={zoom} />
							</div>
						);
					})}
				</div>
			))}
		</div>
	);
};

export default RunMatrix;
