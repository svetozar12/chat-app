import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import dumy from "../src/components/dumy";

describe("Index page", () => {
  it("should render", () => {
    render(<dumy />);
    const main = screen.getByRole("div");
    expect(main).toBeInTheDocument();
  });
});
