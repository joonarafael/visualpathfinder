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
						<div className="font-light">
							{`JPS IS NOT READY YET, IT'S NOT A "REAL JPS"...`}
							<br />
							IT YIELDS SIMILAR RESULTS AS A REGULAR A*.
							<br />
							<br />
							IN ADDITION, THERE STILL EXISTS SOME CRITICAL UNRECOGNIZED
							<br />
							ISSUES WITH THE ALGORITHM. JPS EXECUTION MIGHT CRASH THE APP.
							<br />
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
