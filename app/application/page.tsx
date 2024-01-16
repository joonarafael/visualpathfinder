import ClientOnly from "@/app/components/clientonly";

import PathFinderClient from "./pathfinderclient";

const PathFinderPage = async () => {
	return (
		<ClientOnly>
			<PathFinderClient />
		</ClientOnly>
	);
};

export default PathFinderPage;
