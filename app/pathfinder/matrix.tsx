"use client";

import Tile from './tile';

interface MatrixProps {
	width: number;
	height: number;
	field: number[][];
	zoom: number;
	boreHoleClick: (coords: number[]) => void;
}

const Matrix: React.FC<MatrixProps> = ({
	width,
	height,
	field,
	zoom,
	boreHoleClick,
}) => {
	return (
		<div className="flex flex-col p-2">
			{field.map((row, rowIndex) => (
				<div key={rowIndex} className="flex">
					{row.map((item, colIndex) => (
						<div key={colIndex}>
							<Tile
											index={item}
											coords={[rowIndex, colIndex]}
											zoom={zoom}
											boreHoleClick={boreHoleClick}
										/>
						</div>
					))}
				</div>
			))}
		</div>
	);
};

export default Matrix;
