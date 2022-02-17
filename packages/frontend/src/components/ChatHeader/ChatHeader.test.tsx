import ChatHeader from "./ChatHeader";
import renderer from "react-test-renderer";
import { screen, render, cleanup, RenderResult } from "@testing-library/react";
import { ReactTestRendererJSON } from "react-test-renderer";
import "@testing-library/jest-dom";

let component: ReactTestRendererJSON | ReactTestRendererJSON[] | null;
const socketRef: any = jest.fn();
beforeEach(() => {
  component = renderer
    .create(<ChatHeader cookieName={"greg"} socketRef={socketRef} />)
    .toJSON();
});

afterEach(cleanup);

describe("Render connected React-redux page", () => {
  it("should create snapshot for <LoginForm/>", () => {
    expect(component).toMatchSnapshot();
  });

  it("should render <Group_avatar/>", () => {
    render(<ChatHeader cookieName={"greg"} socketRef={socketRef} />);
    const renderedComponent = screen.getByRole("div");
    expect(renderedComponent).toBeInTheDocument();
  });
});
