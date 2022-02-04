import configureStore from "redux-mock-store";
import FindFriends from "../../src/components/FindFriends";
import renderer from "react-test-renderer";
import { Provider } from "react-redux";
import { initialState as setState } from "../../src/redux/reducer/setReducer";
import { AuthState } from "../../src/redux/reducer/authReducer";
import saveInputReducer from "../../src/redux/reducer/save_inputReducer";
import { screen, render, cleanup, RenderResult } from "@testing-library/react";
import { ReactTestRendererJSON } from "react-test-renderer";
import "@testing-library/jest-dom";

let component: ReactTestRendererJSON | ReactTestRendererJSON[] | null;
let container: RenderResult;
const socketRef: any = jest.fn();
const cookie: any = jest.fn();
beforeEach(() => {
  const mockStore = configureStore([]);
  const store = mockStore({
    authReducer: AuthState,
    setReducer: setState,
    saveInputReducer: saveInputReducer,
  });

  component = renderer
    .create(
      <Provider store={store}>
        <FindFriends cookie={cookie} cookieName="ivan" socketRef={socketRef} />
      </Provider>,
    )
    .toJSON();

  container = render(
    <Provider store={store}>
      <FindFriends cookie={cookie} cookieName="ivan" socketRef={socketRef} />
    </Provider>,
  );
});

afterEach(cleanup);

describe("Render connected React-redux page", () => {
  it("should create snapshot for <FindFriends/>", () => {
    expect(component).toMatchSnapshot();
  });

  it("should render <FindFriends/>", () => {
    const renderedComponent = container.getByRole("searchbox");
    expect(renderedComponent).toBeInTheDocument();
  });
});
