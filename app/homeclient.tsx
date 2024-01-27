"use client";

// Client view for Home Page

import Container from "./components/container";
import { Button } from "./components/ui/button";

const HomeClient = () => {
	return (
		<Container>
			<div className="w-full flex justify-center">
				<div className="max-w-screen-md items-center">
					<div className="w-full flex flex-col gap-4 text-center mt-16">
						<div className="font-bold text-4xl">VISUAL PATHFINDER</div>
						<div className="text-xl font-light text-neutral-500">{`ASSIGNMENT WORK FOR`}</div>
						<div className="text-xl">
							AINEOPINTOJEN HARJOITUSTYÖ: ALGORITMIT JA TEKOÄLY
						</div>
						<div className="font-light text-neutral-500">
							Joona Rafael Kettunen
						</div>
						<Button
							variant={"secondary"}
							onClick={() => window.open("/application", "_self")}
						>
							LAUNCH PATHFINDER
						</Button>
					</div>
				</div>
			</div>
		</Container>
	);
};

export default HomeClient;
