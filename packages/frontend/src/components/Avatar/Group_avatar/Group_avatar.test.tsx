import Group_avatar from "../Group_avatar/Group_avatar";
import renderer from "react-test-renderer";
import { render, cleanup, RenderResult } from "@testing-library/react";
import { ReactTestRendererJSON } from "react-test-renderer";
import "@testing-library/jest-dom";

let component: ReactTestRendererJSON | ReactTestRendererJSON[] | null;
let container: RenderResult;

beforeAll(() => {
  component = renderer
    .create(
      <Group_avatar
        inviter={"ivan"}
        cookieName={"greg"}
        members={["ivan", "greg"]}
      />,
    )
    .toJSON();

  container = render(
    <Group_avatar
      inviter={"ivan"}
      cookieName={"greg"}
      members={["ivan", "greg"]}
    />,
  );
});

afterEach(cleanup);

describe("Render connected React-redux page", () => {
  it("should create snapshot for <LoginForm/>", () => {
    expect(component).toMatchSnapshot();
  });

  it("should render <Group_avatar/>", () => {
    const renderedComponent = container.getByTitle(`groupChat-greg`);
    expect(renderedComponent).toBeInTheDocument();
  });
});
