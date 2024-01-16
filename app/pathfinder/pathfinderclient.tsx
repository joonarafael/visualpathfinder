"use client";

import { useEffect } from "react";

import Container from "@/app/components/container";
import PathFinder from "@/app/pathfinder/pathfinder";

interface PathFinderClientProps {
	width: number;
	height: number;
}

const PathFinderClient: React.FC<PathFinderClientProps> = ({
	width,
	height,
}) => {
	return (
		<Container>
			<PathFinder width={width} height={height} />
		</Container>
	);
};

export default PathFinderClient;
