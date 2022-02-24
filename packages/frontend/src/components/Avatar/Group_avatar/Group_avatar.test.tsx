import Group_avatar from "../Group_avatar/Group_avatar";
import renderer from "react-test-renderer";
import { render, screen } from "@testing-library/react";

describe("Render connected React-redux page", () => {
  it("should create snapshot for <LoginForm/>", () => {
    expect(renderer.create(<Group_avatar inviter={"ivan"} cookieName={"greg"} members={["ivan", "greg"]} />).toJSON()).toMatchSnapshot();
  });

  it("should render <Group_avatar/>", () => {
    render(<Group_avatar inviter={"ivan"} cookieName={"greg"} members={["ivan", "greg"]} />);
    const renderedComponent = screen.getByTitle(`groupChat-greg`);
    expect(renderedComponent).toBeInTheDocument();
  });
});
