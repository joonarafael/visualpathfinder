import Home from "@/app/page";
import { render, screen } from "@testing-library/react";

describe("Home", () => {
	it("should have VISUAL PATHFINDER text", () => {
		render(<Home />);

		const myElem = screen.getByText("VISUAL PATHFINDER");

		expect(myElem).toBeInTheDocument();
	});

	it("should have LAUNCH PATHFINDER button", () => {
		render(<Home />);

		const myElem = screen.getByRole("button", {
			name: "LAUNCH PATHFINDER",
		});

		expect(myElem).toBeInTheDocument();
	});
});
