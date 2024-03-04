"use client";

// This module renders the interactive grid map while in drawing mode.

import { useEffect, useState } from "react";

import Tile from "./tile";

interface MatrixProps {
	width: number;
	height: number;
	field: number[];
	fieldStatus: number[];
	zoom: number;
	tileClick: (index: number) => void;
	smoothing: boolean;
	contrast: boolean;
	indexing: boolean;
}

const Matrix: React.FC<MatrixProps> = ({
	width,
	height,
	field,
	fieldStatus,
	zoom,
	tileClick,
	smoothing,
	contrast,
	indexing,
}) => {
	const [requestRender, setRequestRender] = useState(0);
	const [mouseState, setMouseState] = useState(false);

	// painting mode (mouse hold)
	useEffect(() => {
		const handleMouseDown = () => {
			setMouseState(true);
		};

		const handleMouseUp = () => {
			setMouseState(false);
		};

		document.addEventListener("mousedown", handleMouseDown);
		document.addEventListener("mouseup", handleMouseUp);

		return () => {
			document.removeEventListener("mousedown", handleMouseDown);
			document.removeEventListener("mouseup", handleMouseUp);
		};
	}, []);

	// re-request a render only every 100ms
	const handleTileClick = (index: number) => {
		tileClick(index);

		if (!requestRender) {
			setRequestRender(1);

			setTimeout(() => {
				setRequestRender(0);
			}, 100);
		}
	};

	return (
		<div className={`flex flex-col p-2 ${!smoothing && "border"}`}>
			{Array.from({ length: height }).map((_, rowIndex) => (
				<div key={rowIndex} className="flex">
					{Array.from({ length: width }).map((_, colIndex) => {
						const index = rowIndex * width + colIndex;
						const item = field[index];

						return (
							<div key={colIndex}>
								<Tile
									contrast={contrast}
									smoothing={smoothing}
									indexing={indexing}
									status={fieldStatus[index]}
									index={item}
									zoom={zoom}
									tileClick={handleTileClick}
									mouseState={mouseState}
								/>
							</div>
						);
					})}
				</div>
			))}
		</div>
	);
};

export default Matrix;
