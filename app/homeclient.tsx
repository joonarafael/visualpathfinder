"use client";

// Client view for Home Page

import Container from "./components/container";
import { Button } from "./components/ui/button";

const HomeClient = () => {
	return (
		<Container>
			<div className="w-full flex justify-center">
				<div className="max-w-screen-md items-center">
					<div className="w-full flex flex-col gap-4 text-center">
						<div className="font-bold text-4xl">BLAST CALC</div>
						<div className="font-light text-neutral-500">
							Joona Rafael Kettunen
						</div>
						<Button onClick={() => window.open("/calc/new", "_self")}>
							NEW PLAN
						</Button>
					</div>
				</div>
			</div>
		</Container>
	);
};

export default HomeClient;
