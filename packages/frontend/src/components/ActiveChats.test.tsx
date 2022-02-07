import ActiveChats from "./ActiveChats";
import renderer from "react-test-renderer";
import configureStore from "redux-mock-store";
import { Provider } from "react-redux";
import { initialState } from "../redux/reducer/setReducer";
import { screen, cleanup } from "@testing-library/react";
import { ReactTestRendererJSON } from "react-test-renderer";
import "@testing-library/jest-dom";

let component: ReactTestRendererJSON | ReactTestRendererJSON[] | null;
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
});

afterEach(cleanup);

describe("Render connected React-redux page", () => {
  it("should create snapshot for <ActiveChats/>", () => {
    expect(component).toMatchSnapshot();
  });

  it("should render <ActiveChats/>", () => {
    const renderedComponent = screen.getByText("gerg");
    expect(renderedComponent).toBeInTheDocument();
  });
});
