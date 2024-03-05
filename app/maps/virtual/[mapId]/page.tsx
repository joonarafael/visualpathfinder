// VIRTUAL MAP PNG VIEWER PAGE

import ClientOnly from "@/app/components/clientonly";
import PageError from "@/app/components/pageerror";
import VirtualMapPNGViewerClient from "./virtualmappngviewerclient";

interface IParams {
	mapId?: string;
}

const VirtualMapPNGViewerPage = async ({ params }: { params: IParams }) => {
	const accepted = ["hightown", "woundedcoast", "aurora", "inferno"];

	if (params.mapId) {
		if (accepted.includes(params.mapId)) {
			return (
				<ClientOnly>
					<VirtualMapPNGViewerClient map={params.mapId} />
				</ClientOnly>
			);
		}
	}

	return (
		<PageError message={"Invalid MAP ID provided in the URL parameter."} />
	);
};

export default VirtualMapPNGViewerPage;
