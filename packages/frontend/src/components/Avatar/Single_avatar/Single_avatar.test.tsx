import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import Single_avatar from "./Single_avatar";
import renderer from "react-test-renderer";
import { AuthState } from "redux/reducer/authReducer";
import { render, screen, cleanup, RenderResult } from "@testing-library/react";
import { initialState as inputState } from "redux/reducer/save_inputReducer";
import { ReactTestRendererJSON } from "react-test-renderer";
import "@testing-library/jest-dom";

let component: ReactTestRendererJSON | ReactTestRendererJSON[] | null;
let container: RenderResult;

beforeEach(() => {
  const mockStore = configureStore([]);
  const store = mockStore({
    authReducer: AuthState,
    saveInputReducer: inputState,
  });

  component = renderer
    .create(
      <Provider store={store}>
        <Single_avatar
          inviter="greg"
          cookieName="ivan"
          width="2.25rem"
          height="2.25rem"
          group={false}
          overlay={false}
        />
      </Provider>,
    )
    .toJSON();

  container = render(
    <Provider store={store}>
      <Single_avatar
        inviter="greg"
        cookieName="ivan"
        width="2.25rem"
        height="2.25rem"
        group={false}
        overlay={false}
      />
    </Provider>,
  );
});

afterEach(cleanup);

describe("Render connected React-redux page", () => {
  it("should create snapshot for <Single_avatar/>", () => {
    expect(component).toMatchSnapshot();
  });

  it("should render <Single_avatar/>", () => {
    const renderedComponent = screen.getByTestId("single_avatar");
    expect(renderedComponent).toBeInTheDocument();
  });
});
