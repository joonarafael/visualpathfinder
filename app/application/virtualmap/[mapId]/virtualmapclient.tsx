"use client";

// Client View for Virtual Map Page

import Container from "@/app/components/container";
import VirtualMap from "./virtualmap";
import highTown from "@/app/maps/virtual/hightown";
import woundedCoast from "@/app/maps/virtual/woundedcoast";
import aurora from "@/app/maps/virtual/aurora";
import inferno from "@/app/maps/virtual/inferno";

interface VirtualMapClientProps {
	map: string;
}

const VirtualMapClient: React.FC<VirtualMapClientProps> = ({ map }) => {
	if (map === "hightown") {
		const width = 514;
		const height = highTown.length / width;

		return (
			<Container>
				<VirtualMap
					name={"High Town"}
					map={highTown}
					height={height}
					width={width}
				/>
			</Container>
		);
	}

	if (map === "woundedcoast") {
		const width = 642;
		const height = woundedCoast.length / width;

		return (
			<Container>
				<VirtualMap
					name={"Wounded Coast"}
					map={woundedCoast}
					height={height}
					width={width}
				/>
			</Container>
		);
	}

	if (map === "aurora") {
		const width = 1024;
		const height = aurora.length / width;

		return (
			<Container>
				<VirtualMap
					name={"Aurora"}
					map={aurora}
					height={height}
					width={width}
				/>
			</Container>
		);
	}

	if (map === "inferno") {
		const width = 768;
		const height = inferno.length / width;

		return (
			<Container>
				<VirtualMap
					name={"Inferno"}
					map={inferno}
					height={height}
					width={width}
				/>
			</Container>
		);
	}

	return <div></div>;
};

export default VirtualMapClient;
