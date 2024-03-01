import ClientOnly from "@/app/components/clientonly";
import VirtualMapClient from "./virtualmapclient";
import PageError from "@/app/components/pageerror";

interface IParams {
	mapId?: string;
}

const VirtualMapPage = async ({ params }: { params: IParams }) => {
	if (params.mapId) {
		if (params.mapId === "hightown" || params.mapId === "woundedcoast") {
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
