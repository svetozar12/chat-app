import "@testing-library/jest-dom";
import { cleanup, render } from "@testing-library/react";
import RenderChat from "../../src/components/RenderChat";
import renderer from "react-test-renderer";
import { getFirstChat } from "../../src/utils/getFirstChat";
afterAll(cleanup);

describe("<RenderChat/>", () => {
  const chatId: any = getFirstChat("test1");
  it("should create snapshot", () => {
    const tree = renderer
      .create(
        <RenderChat
          chatId={chatId._id}
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
        chatId={chatId._id}
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
