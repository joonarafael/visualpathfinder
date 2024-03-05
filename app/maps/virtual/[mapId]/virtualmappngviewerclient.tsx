"use client";

// Client View for Virtual Map PNG Viewer Page

import Container from "@/app/components/container";
import PNGViewer from "./pngviewer";
import { Button } from "@/app/components/ui/button";

interface VirtualMapPNGViewerClientProps {
	map: string;
}

const VirtualMapPNGViewerClient: React.FC<VirtualMapPNGViewerClientProps> = ({
	map,
}) => {
	let mapString = map;

	if (map === "hightown") {
		mapString = "high town";
	} else if (map === "woundedcoast") {
		mapString = "wounded coast";
	}

	return (
		<Container>
			<div className="flex flex-col gap-2 w-full items-center justify-center">
				<div className="text-lg font-light">VIRTUAL MAP</div>
				<div className="text-4xl font-bold mb-4">{mapString.toUpperCase()}</div>
				<PNGViewer map={map} />
				<Button
					className="w-96 mt-4"
					variant={"destructive"}
					onClick={() => {
						window.close();
					}}
				>
					CLOSE
				</Button>
			</div>
		</Container>
	);
};

export default VirtualMapPNGViewerClient;
