import { screen, render } from "@testing-library/react";
import "@testing-library/jest-dom";
import Home from "../../src/pages/index";

describe("index page", () => {
  it("renders index page", async () => {
    render(<Home />);
    const headingElement = screen.getByText("Create an account !");
    expect(headingElement).toBeInTheDocument();
  });
});
