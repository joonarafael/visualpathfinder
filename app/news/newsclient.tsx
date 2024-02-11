"use client";

import Container from "@/app/components/container";
import { Button } from "@/app/components/ui/button";

const NewsClient = () => {
	return (
		<Container>
			<div className="w-full flex justify-center">
				<div className="max-w-screen-md items-center">
					<div className="w-full flex flex-col gap-4 text-center mt-16">
						<div className="font-bold text-4xl">ONE MORE THING</div>
						<div className="text-xl font-bold text-yellow-500">
							JPS IS STILL UNDER CONSTRUCTION
						</div>
						<div className="text-xl font-bold text-rose-500">
							JPS EXECUTION MIGHT CRASH THE APPLICATION
						</div>
						<div className="font-light">
							IT CURRENTLY ONLY JUMPS ONE TILE AT A TIME.
							<br />
							THIS RESULTS IT IN A SIMILAR PATH AND PERFORMANCE AS THE A*.
							<br />
							<br />
							JPS ALSO FALSELY RECOGNIZES VISITED AND NON-VISITED NODES
							<br />
							RENDERING AN INCORRECT RESULT VIEW.
							<br />
							<br />
							IN ADDITION, JPS ALSO SUFFERS FROM INCOMPLETE NEIGHBOR LOGIC,
							<br />
							IT WILL SOMETIMES CUT THROUGH WALLS DIAGONALLY.
						</div>
						<Button
							variant={"secondary"}
							onClick={() => window.open("/application", "_self")}
						>
							{`ALRIGHT`}
						</Button>
					</div>
				</div>
			</div>
		</Container>
	);
};

export default NewsClient;
