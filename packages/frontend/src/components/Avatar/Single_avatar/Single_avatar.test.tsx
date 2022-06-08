import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import Single_avatar from "./Single_avatar";
import renderer from "react-test-renderer";
import { AuthState } from "../../../redux/reducer/authReducer/authReducer";
import { render, screen } from "@testing-library/react";
import { initialState as inputState } from "../../../redux/reducer/save_inputReducer/save_inputReducer";
import "@testing-library/jest-dom";

const mockStore = configureStore([]);
const store = mockStore({
  authReducer: AuthState,
  saveInputReducer: inputState,
});

const setupRender = () => {
  const component = render(
    <Provider store={store}>
      <Single_avatar inviter="greg" cookieName="ivan" width="2.25rem" height="2.25rem" group={false} overlay={false} />
    </Provider>,
  );
  return component;
};

describe("Render connected React-redux page", () => {
  beforeEach(() => {
    setupRender();
  });
  it("should create snapshot for <Single_avatar/>", () => {
    expect(
      renderer
        .create(
          <Provider store={store}>
            <Single_avatar inviter="greg" cookieName="ivan" width="2.25rem" height="2.25rem" group={false} overlay={false} />
          </Provider>,
        )
        .toJSON(),
    ).toMatchSnapshot();
  });

  it("should render <Single_avatar/>", () => {
    const renderedComponent = screen.getByTestId("single_avatar");
    expect(renderedComponent).toBeInTheDocument();
  });
});
