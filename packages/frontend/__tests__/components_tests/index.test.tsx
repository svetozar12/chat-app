import { screen, render, RenderResult } from "@testing-library/react";
import "@testing-library/jest-dom";
import Home from "../../src/pages/index";

describe("index page", () => {
  let container: RenderResult;
  beforeEach(() => {
    container = render(<Home />);
  });

  it("renders index page", async () => {
    const headingElement = screen.getByText("Create an account !");
    expect(headingElement).toBeInTheDocument();
  });
  it("register link should have href with http://localhost:3000/register", async () => {
    const register_href = container
      .getByText("Create an account !")
      .closest("a");
    expect(register_href).toHaveAttribute(
      "href",
      "http://localhost:3000/register",
    );
  });

  it("login link should have href with http://localhost:3000/login", async () => {
    const login_href = container
      .getByText("Already have a acount ?")
      .closest("a");
    expect(login_href).toHaveAttribute("href", "http://localhost:3000/login");
  });
});
