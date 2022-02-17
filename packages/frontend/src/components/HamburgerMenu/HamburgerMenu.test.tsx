import HamburgerMenu from "../HamburgerMenu/HamburgerMenu";
import renderer from "react-test-renderer";
import configureStore from "redux-mock-store";
import { Provider } from "react-redux";
import { initialState as setState } from "../../redux/reducer/setReducer";
import { AuthState } from "../../redux/reducer/authReducer";
import saveInputReducer from "../../redux/reducer/save_inputReducer";
import { screen, render, cleanup, RenderResult } from "@testing-library/react";
import { ReactTestRendererJSON } from "react-test-renderer";
import "@testing-library/jest-dom";

let component: ReactTestRendererJSON | ReactTestRendererJSON[] | null;
let container: RenderResult;
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
        <HamburgerMenu />
      </Provider>,
    )
    .toJSON();

  container = render(
    <Provider store={store}>
      <HamburgerMenu />
    </Provider>,
  );
});

afterEach(cleanup);

describe("Render connected React-redux page", () => {
  it("should create snapshot for <HamburgerMenu/>", () => {
    expect(component).toMatchSnapshot();
  });

  it("should render <HamburgerMenu/>", () => {
    const renderedComponent = container.getByTitle("hamburger");
    expect(renderedComponent).toBeInTheDocument();
  });
});
