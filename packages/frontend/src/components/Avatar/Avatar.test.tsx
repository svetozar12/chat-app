import Avatar from "../Avatar/Avatar";
import renderer from "react-test-renderer";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

const setupRender = () => {
  const component = render(<Avatar inviter={"ivan"} cookieName={"greg"} members={["ivan", "greg"]} />);
  return component;
};

describe("Render connected React-redux page", () => {
  beforeEach(() => {
    setupRender();
  });
  it("should create snapshot for <LoginForm/>", () => {
    expect(renderer.create(<Avatar inviter={"ivan"} cookieName={"greg"} members={["ivan", "greg"]} />).toJSON()).toMatchSnapshot();
  });

  it("should render <Avatar/>", () => {
    const renderedComponent = screen.getByTitle("greg");
    expect(renderedComponent).toBeInTheDocument();
  });
});
