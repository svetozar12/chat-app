import ActiveChats from "../../src/components/ActiveChats";
import renderer from "react-test-renderer";
import { render, cleanup, RenderResult } from "@testing-library/react";
import { ReactTestRendererJSON } from "react-test-renderer";
import "@testing-library/jest-dom";

let component: ReactTestRendererJSON | ReactTestRendererJSON[] | null;
let container: RenderResult;
const socketRef: any = jest.fn();

beforeEach(() => {
  component = renderer
    .create(
      <ActiveChats
        _id="61c4957b735b579e5442dfe8"
        user1="ivan"
        user2="gerg"
        cookieName="ivan"
        socketRef={socketRef}
      />,
    )
    .toJSON();

  container = render(
    <ActiveChats
      _id="61c4957b735b579e5442dfe8"
      user1="ivan"
      user2="gerg"
      cookieName="ivan"
      socketRef={socketRef}
    />,
  );
});

afterEach(cleanup);

describe("Render connected React-redux page", () => {
  it("should create snapshot for <ActiveChats/>", () => {
    expect(component).toMatchSnapshot();
  });

  it("should render <ActiveChats/>", () => {
    const renderedComponent = container.getByText("gerg");
    expect(renderedComponent).toBeInTheDocument();
  });
});
