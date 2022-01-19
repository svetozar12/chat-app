import ActiveChats from "../../src/components/ActiveChats";
import renderer from "react-test-renderer";
import configureStore from "redux-mock-store";
import { Provider } from "react-redux";
import { initialState } from "../../src/redux/reducer/setReducer";
import { screen, render, cleanup, RenderResult } from "@testing-library/react";
import { ReactTestRendererJSON } from "react-test-renderer";
import "@testing-library/jest-dom";

let component: ReactTestRendererJSON | ReactTestRendererJSON[] | null;
let container: RenderResult;
const socketRef: any = jest.fn();
const dumy: string[] = ["ivan", "gerg"];
beforeEach(() => {
  const mockStore = configureStore([]);
  const store = mockStore({
    setReducer: initialState,
  });
  component = renderer
    .create(
      <Provider store={store}>
        <ActiveChats
          _id="61c4957b735b579e5442dfe8"
          chatId="61c4957b735b579e5442dfe8"
          members={dumy}
          cookieName="ivan"
          socketRef={socketRef}
        />
      </Provider>,
    )
    .toJSON();

  container = render(
    <ActiveChats
      _id="61c4957b735b579e5442dfe8"
      chatId="61c4957b735b579e5442dfe8"
      members={dumy}
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
    const renderedComponent = container.getByText("ivan");
    screen.getByRole("");
    // expect(renderedComponent).toBeInTheDocument();
  });
});
