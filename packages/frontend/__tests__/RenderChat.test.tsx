import "@testing-library/jest-dom";
import { cleanup, render } from "@testing-library/react";
import RenderChat from "../src/components/RenderChat";
import renderer from "react-test-renderer";

afterAll(cleanup);

describe("<RenderChat/>", () => {
  it("should create snapshot", () => {
    const tree = renderer
      .create(
        <RenderChat
          sender="test1"
          time_stamp="1111"
          message="hello"
          cookie="test2"
        />,
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
  it("should render", () => {
    const container = render(
      <RenderChat
        sender="test1"
        time_stamp="1111"
        message="hello"
        cookie="test2"
      />,
    );
    const test = container.getByText("hello");
    expect(test).toBeInTheDocument();
  });
});
