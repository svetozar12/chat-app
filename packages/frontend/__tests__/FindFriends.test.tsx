import configureStore from "redux-mock-store";
import FindFriends from "../src/components/FindFriends";
import renderer from "react-test-renderer";
import { Provider } from "react-redux";
import { initialState } from "../src/redux/reducer/homePageReducer";
import { AuthState } from "../src/redux/reducer/authReducer";
import { render, cleanup, RenderResult } from "@testing-library/react";
import { ReactTestRendererJSON } from "react-test-renderer";
import "@testing-library/jest-dom";

let component: ReactTestRendererJSON | ReactTestRendererJSON[] | null;
let container: RenderResult;
const socketRef: any = jest.fn();

beforeEach(() => {
  const mockStore = configureStore([]);
  const store = mockStore({
    authReducer: AuthState,
    homePageReducer: initialState,
  });

  component = renderer
    .create(
      <Provider store={store}>
        <FindFriends cookieName="ivan" socketRef={socketRef} />
      </Provider>,
    )
    .toJSON();

  container = render(
    <Provider store={store}>
      <FindFriends cookieName="ivan" socketRef={socketRef} />
    </Provider>,
  );
});

afterEach(cleanup);

describe("Render connected React-redux page", () => {
  it("should create snapshot for <FindFriends/>", () => {
    expect(component).toMatchSnapshot();
  });

  it("should render <FindFriends/>", () => {
    const renderedComponent = container.getByText("Your chats");
    expect(renderedComponent).toBeInTheDocument();
  });
});
