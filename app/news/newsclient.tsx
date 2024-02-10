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
							THIS RESULTS IN A SIMILAR RESULT AS THE A*.
							<br />
							THE JPS ALSO FALSELY RECOGNIZES VISITED AND NON-VISITED NODES
							<br />
							RENDERING AN INCORRECT RESULT VIEW.
							<br />
							<p className="text-neutral-500">
								(INCOMPLETE NEIGHBOR PROCESSING LOGIC)
							</p>
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
