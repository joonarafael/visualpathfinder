"use client";

// Client View for Virtual Map Running

import Container from "@/app/components/container";
import VirtualMap from "./virtualmap";
import highTown from "@/app/maps/virtual/hightown";
import woundedCoast from "@/app/maps/virtual/woundedcoast";

interface VirtualMapClientProps {
	map: string;
}

const VirtualMapClient: React.FC<VirtualMapClientProps> = ({ map }) => {
	if (map === "hightown") {
		const width = 514;
		const height = highTown.length / width;

		return (
			<Container>
				<VirtualMap map={highTown} height={height} width={width} />
			</Container>
		);
	}

	if (map === "woundedcoast") {
		const width = 642;
		const height = woundedCoast.length / width;

		return (
			<Container>
				<VirtualMap map={woundedCoast} height={height} width={width} />
			</Container>
		);
	}

	return <div></div>;
};

export default VirtualMapClient;
