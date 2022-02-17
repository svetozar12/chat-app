import ChatRoom from "../ChatRoom/ChatRoom";
import renderer from "react-test-renderer";
import { render, cleanup, RenderResult } from "@testing-library/react";
import { ReactTestRendererJSON } from "react-test-renderer";
import "@testing-library/jest-dom";

let component: ReactTestRendererJSON | ReactTestRendererJSON[] | null;
let container: RenderResult;
const socketRef: any = jest.fn();
const submit: any = jest.fn();

beforeEach(() => {
  component = renderer
    .create(<ChatRoom cookie={submit} chatId={"321312313"} />)
    .toJSON();

  container = render(<ChatRoom cookie={submit} chatId={"321312313"} />);
});

afterEach(cleanup);

describe("Render connected React-redux page", () => {
  it("should create snapshot for <LoginForm/>", () => {
    expect(component).toMatchSnapshot();
  });

  it("should render <Group_avatar/>", () => {
    const renderedComponent = container.getByRole("textarea");
    expect(renderedComponent).toBeInTheDocument();
  });
});
