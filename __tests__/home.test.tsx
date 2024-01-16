import Home from "@/app/page";
import { render, screen } from "@testing-library/react";

describe("Home", () => {
	it("should have BLAST CALC text", () => {
		render(<Home />);

		const myElem = screen.getByText("BLAST CALC");

		expect(myElem).toBeInTheDocument();
	});

	it("should have NEW PLAN button", () => {
		render(<Home />);

		const myElem = screen.getByRole("button", {
			name: "NEW PLAN",
		});

		expect(myElem).toBeInTheDocument();
	});
});
