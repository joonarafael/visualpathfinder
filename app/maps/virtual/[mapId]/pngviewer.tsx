"use client";

import aurora from "@/app/maps/virtual/png/aurora.png";
import hightown from "@/app/maps/virtual/png/hightown.png";
import inferno from "@/app/maps/virtual/png/inferno.png";
import woundedcoast from "@/app/maps/virtual/png/woundedcoast.png";

interface PNGViewerProps {
	map: string;
}

const PNGViewer: React.FC<PNGViewerProps> = ({ map }) => {
	let data;

	if (map === "aurora") {
		data = aurora;
	} else if (map === "hightown") {
		data = hightown;
	} else if (map === "inferno") {
		data = inferno;
	} else {
		data = woundedcoast;
	}

	return (
		<div>
			<img width="612" height="612" src={data.src} alt="map" />
		</div>
	);
};

export default PNGViewer;
