import ClientOnly from "@/app/components/clientonly";

import NewPlanSettingsClient from "./newplansettingsclient";

const NewPlanSettingsPage = () => {
	return (
		<ClientOnly>
			<NewPlanSettingsClient />
		</ClientOnly>
	);
};

export default NewPlanSettingsPage;
