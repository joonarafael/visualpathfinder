"use client";

import { useState } from "react";
import { toast } from "sonner";

import Container from "@/app/components/container";
import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";

const NewPlanSettingsClient = () => {
	const [fieldWidth, setFieldWidth] = useState(6);
	const [fieldHeight, setFieldHeight] = useState(4);

	const handleNewPlan = () => {
		if (!fieldWidth || !fieldHeight) {
			toast("Provide a width and height.");
			return;
		}

		if (fieldWidth <= 0 || fieldHeight <= 0) {
			toast("Do not enter values equal to or less than zero.");
			return;
		}

		if (fieldWidth > 32 || fieldHeight > 32) {
			toast("Do not enter values greater than 32.");
			return;
		}

		window.open(`new/${fieldWidth}/${fieldHeight}`, "_self");
	};

	const handleFieldWidthChange = (value: string) => {
		try {
			const asNumber = parseInt(value, 10);

			if (asNumber < 1) {
				setFieldWidth(1);
			} else if (asNumber > 32) {
				setFieldWidth(32);
			} else {
				setFieldWidth(asNumber);
			}
		} catch (e) {
			console.log(e);
		}
	};

	const handleFieldHeightChange = (value: string) => {
		try {
			const asNumber = parseInt(value, 10);

			if (asNumber < 1) {
				setFieldHeight(1);
			} else if (asNumber > 32) {
				setFieldHeight(32);
			} else {
				setFieldHeight(asNumber);
			}
		} catch (e) {
			console.log(e);
		}
	};

	return (
		<Container>
			<div className="w-full flex justify-center">
				<div className="max-w-screen-md items-center">
					<div className="w-full flex flex-col gap-4 text-center">
						<div className="font-bold text-4xl">CREATE A NEW PLAN</div>
						<div className="font-light text-neutral-500">
							Start by giving the field size and other global variables.
						</div>
						<hr />
						<div>Enter values between 1 and 32.</div>
						<div className="flex flex-row gap-4 w-full">
							<div className="flex flex-col gap-2 p-4 border w-1/2">
								<label htmlFor="fieldWidth">FIELD WIDTH</label>
								<Input
									value={fieldWidth}
									type="number"
									id="fieldWidth"
									placeholder="Field Width"
									onChange={(e) => handleFieldWidthChange(e.target.value)}
								/>
							</div>
							<div className="flex flex-col gap-2 p-4 border w-1/2">
								<label htmlFor="fieldHeight">FIELD HEIGHT</label>
								<Input
									value={fieldHeight}
									type="number"
									id="fieldHeight"
									placeholder="Field Height"
									onChange={(e) => handleFieldHeightChange(e.target.value)}
								/>
							</div>
						</div>
						<hr />
						<Button onClick={handleNewPlan}>CREATE</Button>
					</div>
				</div>
			</div>
		</Container>
	);
};

export default NewPlanSettingsClient;
