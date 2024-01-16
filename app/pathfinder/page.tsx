import ClientOnly from "@/app/components/clientonly";

import PathFinderClient from "./pathfinderclient";

const PathFinderPage = async () => {
	return (
		<ClientOnly>
			<PathFinderClient width={64} height={64} />
		</ClientOnly>
	);
};

export default PathFinderPage;
