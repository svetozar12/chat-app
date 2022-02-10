import configureStore from "redux-mock-store";
import AddGroupChat from "components/AddGroupChat/AddGroupChat";
import renderer from "react-test-renderer";
import { Provider } from "react-redux";
import { initialState } from "redux/reducer/setReducer";
import { AuthState } from "redux/reducer/authReducer";
import { screen, cleanup } from "@testing-library/react";
import { ReactTestRendererJSON } from "react-test-renderer";
import "@testing-library/jest-dom";

let component: ReactTestRendererJSON | ReactTestRendererJSON[] | null;
const socketRef: any = jest.fn();

beforeAll(() => {
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
});

afterAll(cleanup);

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
