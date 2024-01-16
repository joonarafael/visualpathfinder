"use client";

import Container from "./container";

// layout to use for all possible site errors
// e.g. false URL

interface PageErrorProps {
	message: string;
}

const PageError: React.FC<PageErrorProps> = ({ message }) => {
	return (
		<Container>
			<div className="w-full text-center flex flex-col gap-4">
				<div className="text-2xl font-bold">ERROR</div>
				<div className="font-light">{message}</div>
			</div>
		</Container>
	);
};

export default PageError;
