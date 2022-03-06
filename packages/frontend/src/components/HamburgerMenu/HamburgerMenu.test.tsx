import HamburgerMenu from "../HamburgerMenu";
import renderer from "react-test-renderer";
import configureStore from "redux-mock-store";
import { Provider } from "react-redux";
import { initialState as setState } from "../../redux/reducer/setReducer";
import { AuthState } from "../../redux/reducer/authReducer";
import saveInputReducer from "../../redux/reducer/save_inputReducer";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

const mockStore = configureStore([]);
const store = mockStore({
  authReducer: AuthState,
  setReducer: setState,
  saveInputReducer: saveInputReducer,
});

const setupRender = () => {
  const component = render(
    <Provider store={store}>
      <HamburgerMenu />
    </Provider>,
  );

  return component;
};

describe("Render connected React-redux page", () => {
  beforeEach(() => {
    setupRender();
  });
  it("should create snapshot for <HamburgerMenu/>", () => {
    expect(
      renderer
        .create(
          <Provider store={store}>
            <HamburgerMenu />
          </Provider>,
        )
        .toJSON(),
    ).toMatchSnapshot();
  });

  it("should render <HamburgerMenu/>", () => {
    const renderedComponent = screen.getByTitle("hamburger");
    expect(renderedComponent).toBeInTheDocument();
  });
});
