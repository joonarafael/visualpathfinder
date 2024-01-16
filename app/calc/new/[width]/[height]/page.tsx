import ClientOnly from "@/app/components/clientonly";
import PageError from "@/app/components/pageerror";
import { fieldSizeValidation } from "@/app/validations/fieldsizevalidation";

import NewPlanClient from "./newplanclient";

interface IParams {
	width?: number;
	height?: number;
}

const NewPlanPage = async ({ params }: { params: IParams }) => {
	if (params.width === undefined || params.height === undefined) {
		return (
			<ClientOnly>
				<PageError message={"Invalid URL parameters."} />
			</ClientOnly>
		);
	}

	const acceptedWidth = fieldSizeValidation(params.width);

	if (acceptedWidth !== 0) {
		return (
			<ClientOnly>
				<PageError message={acceptedWidth} />
			</ClientOnly>
		);
	}

	const acceptedHeight = fieldSizeValidation(params.height);

	if (acceptedHeight !== 0) {
		return (
			<ClientOnly>
				<PageError message={acceptedHeight} />
			</ClientOnly>
		);
	}

	return (
		<ClientOnly>
			<NewPlanClient width={params.width} height={params.height} />
		</ClientOnly>
	);
};

export default NewPlanPage;
