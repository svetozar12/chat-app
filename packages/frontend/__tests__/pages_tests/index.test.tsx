import { screen, render, RenderResult } from "@testing-library/react";
import "@testing-library/jest-dom";
import Home from "../../src/pages/index";
import Router from "next/router";

describe("index page", () => {
  const spies: any = {};
  let container: RenderResult;
  beforeEach(() => {
    container = render(<Home />);
    spies.routerChangeStart = jest.fn();
    Router.events.on("routeChangeStart", spies.routerChangeStart);
  });

  afterEach(() => {
    Router.events.off("routeChangeStart", spies.routerChangeStart);
  });
  it("renders index page", async () => {
    const headingElement = screen.getByText("Create an account !");
    expect(headingElement).toBeInTheDocument();
  });
  test("click on link create account and redirect", async () => {
    const register_href = container
      .getByText("Create an account !")
      .closest("a");
    expect(register_href).toHaveAttribute(
      "href",
      "http://localhost:3000/register",
    );
  });

  test("click on link login into account and redirect", async () => {
    const login_href = container
      .getByText("Already have a acount ?")
      .closest("a");
    expect(login_href).toHaveAttribute("href", "http://localhost:3000/login");
  });
});
