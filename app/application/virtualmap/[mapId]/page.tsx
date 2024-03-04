// VIRTUAL MAP PAGE

import ClientOnly from "@/app/components/clientonly";
import VirtualMapClient from "./virtualmapclient";
import PageError from "@/app/components/pageerror";

interface IParams {
	mapId?: string;
}

const VirtualMapPage = async ({ params }: { params: IParams }) => {
	const accepted = ["hightown", "woundedcoast", "aurora", "inferno"];

	if (params.mapId) {
		if (accepted.includes(params.mapId)) {
			return (
				<ClientOnly>
					<VirtualMapClient map={params.mapId} />
				</ClientOnly>
			);
		}
	}

	return (
		<PageError message={"Invalid MAP ID provided in the URL parameter."} />
	);
};

export default VirtualMapPage;
