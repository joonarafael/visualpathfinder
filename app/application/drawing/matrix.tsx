"use client";

// This module renders the interactive grid map during drawing.

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
}) => {
	const [requestRender, setRequestRender] = useState(0);
	const [mouseState, setMouseState] = useState(false);

	useEffect(() => {
		const handleMouseDown = () => {
			setMouseState(true);
		};

		const handleMouseUp = () => {
			setMouseState(false);
		};

		// Attach event listeners when the component mounts
		document.addEventListener("mousedown", handleMouseDown);
		document.addEventListener("mouseup", handleMouseUp);

		// Detach event listeners when the component unmounts
		return () => {
			document.removeEventListener("mousedown", handleMouseDown);
			document.removeEventListener("mouseup", handleMouseUp);
		};
	}, []);

	const handleTileClick = (index: number) => {
		tileClick(index);

		if (!requestRender) {
			setRequestRender(1); // Set to any value to indicate that a render has been requested

			setTimeout(() => {
				setRequestRender(0); // Reset to 0 after the debounce time
			}, 100);
		}
	};

	return (
		<div className={`flex flex-col p-2 ${contrast && "border"}`}>
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
