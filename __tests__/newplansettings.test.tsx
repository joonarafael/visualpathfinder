import NewPlanSettingsPage from "@/app/calc/new/page";
import { render, screen } from "@testing-library/react";

describe("NewPlanSettings", () => {
	it("should have CREATE A NEW PLAN text", () => {
		render(<NewPlanSettingsPage />);

		const myElem = screen.getByText("CREATE A NEW PLAN");

		expect(myElem).toBeInTheDocument();
	});

	it("should have CREATE button", () => {
		render(<NewPlanSettingsPage />);

		const myElem = screen.getByRole("button", {
			name: "CREATE",
		});

		expect(myElem).toBeInTheDocument();
	});

	it("should have FIELD WIDTH input", () => {
		render(<NewPlanSettingsPage />);

		const myElem = screen.getByLabelText("FIELD WIDTH");

		expect(myElem).toBeInTheDocument();
	});

	it("should have FIELD HEIGHT input", () => {
		render(<NewPlanSettingsPage />);

		const myElem = screen.getByLabelText("FIELD HEIGHT");

		expect(myElem).toBeInTheDocument();
	});
});
