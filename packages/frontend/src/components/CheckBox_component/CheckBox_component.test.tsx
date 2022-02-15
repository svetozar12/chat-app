import CheckBox_component from "components/ChatSettings/ChatSettings";
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
      <CheckBox_component
        cookieName={"greg"}
        socketRef={submit}
        setLocalStatus={submit}
        chatId={"321312313"}
      />,
    )
    .toJSON();

  container = render(
    <CheckBox_component
      cookieName={"greg"}
      socketRef={submit}
      setLocalStatus={submit}
      chatId={"321312313"}
    />,
  );
});

afterEach(cleanup);

describe("Render connected React-redux page", () => {
  it("should create snapshot for <CheckBox_component/>", () => {
    expect(component).toMatchSnapshot();
  });

  it("should render <CheckBox_component/>", () => {
    const renderedComponent = container.getByText("Members in chat");
    expect(renderedComponent).toBeInTheDocument();
  });
});
