import ChatSettings from "components/ChatSettings/ChatSettings";
import renderer from "react-test-renderer";
import { render, cleanup, RenderResult } from "@testing-library/react";
import { ReactTestRendererJSON } from "react-test-renderer";
import "@testing-library/jest-dom";

let component: ReactTestRendererJSON | ReactTestRendererJSON[] | null;
let container: RenderResult;
const submit: any = jest.fn();

beforeEach(() => {
  component = renderer
    .create(
      <ChatSettings
        cookieName={"greg"}
        socketRef={submit}
        setLocalStatus={submit}
        chatId={"321312313"}
      />,
    )
    .toJSON();

  container = render(
    <ChatSettings
      cookieName={"greg"}
      socketRef={submit}
      setLocalStatus={submit}
      chatId={"321312313"}
    />,
  );
});

afterEach(cleanup);

describe("Render connected React-redux page", () => {
  it("should create snapshot for <ChatSettings/>", () => {
    expect(component).toMatchSnapshot();
  });

  it("should render <ChatSettings/>", () => {
    const renderedComponent = container.getByText("Members in chat");
    expect(renderedComponent).toBeInTheDocument();
  });
});
