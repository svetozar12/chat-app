import configureStore from "redux-mock-store";
import AddGroupChat from "../../src/components/AddGroupChat";
import renderer from "react-test-renderer";
import { Provider } from "react-redux";
import { initialState } from "../../src/redux/reducer/setReducer";
import { AuthState } from "../../src/redux/reducer/authReducer";
import { screen, render, cleanup, RenderResult } from "@testing-library/react";
import { ReactTestRendererJSON } from "react-test-renderer";
import "@testing-library/jest-dom";

let component: ReactTestRendererJSON | ReactTestRendererJSON[] | null;
let container: RenderResult;
const socketRef: any = jest.fn();

beforeEach(() => {
  const mockStore = configureStore([]);
  const store = mockStore({
    authReducer: AuthState,
    setReducer: initialState,
  });

  component = renderer
    .create(
      <Provider store={store}>
        <AddGroupChat cookieName="ivan" socketRef={socketRef} />
      </Provider>,
    )
    .toJSON();

  container = render(
    <Provider store={store}>
      <AddGroupChat cookieName="ivan" socketRef={socketRef} />
    </Provider>,
  );
});

afterEach(cleanup);

describe("Render connected React-redux page", () => {
  it("should create snapshot for <AddGroupChat/>", () => {
    expect(component).toMatchSnapshot();
  });

  it("should render <AddGroupChat/>", () => {
    const renderedComponent = screen.getByTestId("form");
    screen.getByRole("");
    expect(renderedComponent).toBeInTheDocument();
  });
});
