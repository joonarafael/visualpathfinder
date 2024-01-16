"use client";

import { useEffect } from "react";

import Calculator from "@/app/calc/calculator";
import Container from "@/app/components/container";

interface NewPlanClientProps {
	width: number;
	height: number;
}

const NewPlanClient: React.FC<NewPlanClientProps> = ({ width, height }) => {
	return (
		<Container>
			<Calculator width={width} height={height} />
		</Container>
	);
};

export default NewPlanClient;
