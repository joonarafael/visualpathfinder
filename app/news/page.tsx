// News page.

import ClientOnly from "@/app/components/clientonly";

import NewsClient from "./newsclient";

const PathFinderPage = async () => {
	return (
		<ClientOnly>
			<NewsClient />
		</ClientOnly>
	);
};

export default PathFinderPage;
