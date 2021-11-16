import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import RenderChat from "../src/components/RenderChat";

describe("<RenderChat/>", () => {
  it("should render", () => {
    const container = render(
      <RenderChat
        sender="test1"
        time_stamp="1111"
        message="hello"
        cookie="test2"
      />,
    );
    const test = container.getByTestId("test");
    expect(test.className).toBe("you");
  });
});
