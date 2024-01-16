// HOME PAGE

import ClientOnly from "./components/clientonly";
import HomeClient from "./homeclient";

export default function Home() {
	return (
		<ClientOnly>
			<HomeClient />
		</ClientOnly>
	);
}
