"use client";

import BoreHole from "./borehole";
import Connection from "./connection";

interface MatrixProps {
	width: number;
	height: number;
	field: number[][];
	fieldStatus: number[][];
	zoom: number;
	selectedBoreHole?: number | null;
	boreHoleClick: (coords: number[]) => void;
}

const Matrix: React.FC<MatrixProps> = ({
	width,
	height,
	field,
	fieldStatus,
	zoom,
	selectedBoreHole,
	boreHoleClick,
}) => {
	return (
		<div className="flex flex-col p-2">
			{field.map((row, rowIndex) => (
				<div key={rowIndex} className="flex">
					{row.map((item, colIndex) => (
						<div key={colIndex}>
							{rowIndex % 2 === 0 ? (
								<>
									{colIndex % 2 === 0 ? (
										<BoreHole
											index={item}
											coords={[rowIndex, colIndex]}
											zoom={zoom}
											status={fieldStatus[rowIndex][colIndex]}
											selectedBoreHole={selectedBoreHole}
											boreHoleClick={boreHoleClick}
										/>
									) : (
										<Connection index={item} zoom={zoom} />
									)}
								</>
							) : (
								<Connection index={item} zoom={zoom} />
							)}
						</div>
					))}
				</div>
			))}
		</div>
	);
};

export default Matrix;
