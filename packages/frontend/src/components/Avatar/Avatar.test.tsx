import Avatar from "../Avatar/Avatar";
import renderer from "react-test-renderer";
import { render, cleanup, RenderResult } from "@testing-library/react";
import { ReactTestRendererJSON } from "react-test-renderer";
import "@testing-library/jest-dom";

let component: ReactTestRendererJSON | ReactTestRendererJSON[] | null;
let container: RenderResult;

beforeEach(() => {
  component = renderer.create(<Avatar inviter={"ivan"} cookieName={"greg"} members={["ivan", "greg"]} />).toJSON();

  container = render(<Avatar inviter={"ivan"} cookieName={"greg"} members={["ivan", "greg"]} />);
});

afterEach(cleanup);

describe("Render connected React-redux page", () => {
  it("should create snapshot for <LoginForm/>", () => {
    expect(component).toMatchSnapshot();
  });

  it("should render <Avatar/>", () => {
    const renderedComponent = container.getByTitle("greg");
    expect(renderedComponent).toBeInTheDocument();
  });
});
