import Group_avatar from "../Group_avatar";
import renderer from "react-test-renderer";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

const setupRender = () => {
  const component = render(<Group_avatar inviter={"ivan"} cookieName={"greg"} members={["ivan", "greg"]} />);
  return component;
};

describe("Render connected React-redux page", () => {
  beforeEach(() => {
    setupRender();
  });
  it("should create snapshot for <LoginForm/>", () => {
    expect(renderer.create(<Group_avatar inviter={"ivan"} cookieName={"greg"} members={["ivan", "greg"]} />).toJSON()).toMatchSnapshot();
  });

  it("should render <Group_avatar/>", () => {
    const renderedComponent = screen.getByTitle("groupChat-greg");
    expect(renderedComponent).toBeInTheDocument();
  });
});
