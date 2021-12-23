import PendingChats from "../src/components/PendingChats";
import renderer from "react-test-renderer";
import { render, cleanup, RenderResult } from "@testing-library/react";
import { ReactTestRendererJSON } from "react-test-renderer";
import "@testing-library/jest-dom";

let component: ReactTestRendererJSON | ReactTestRendererJSON[] | null;
let container: RenderResult;
const socketRef: any = jest.fn();
const setLocalStatus = jest.fn();

beforeEach(() => {
  component = renderer
    .create(
      <PendingChats
        _id="61c4957b735b579e5442dfe8"
        inviter="ivan"
        reciever="gosho"
        socketRef={socketRef}
        setLocalStatus={setLocalStatus}
        status="recieved"
      />,
    )
    .toJSON();

  container = render(
    <PendingChats
      _id="61c4957b735b579e5442dfe8"
      inviter="ivan"
      reciever="gosho"
      socketRef={socketRef}
      setLocalStatus={setLocalStatus}
      status="recieved"
    />,
  );
});

afterEach(cleanup);

describe("Render connected React-redux page", () => {
  it("should create snapshot for <PendingChats/>", () => {
    expect(component).toMatchSnapshot();
  });

  it("should render <PendingChats/>", () => {
    const renderedComponent = container.getByText("ivan");
    expect(renderedComponent).toBeInTheDocument();
  });
});
