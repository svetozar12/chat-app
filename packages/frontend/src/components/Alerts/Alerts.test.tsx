import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import { AuthState } from "../../redux/reducer/authReducer";
import Alerts from "./Alerts";
import renderer from "react-test-renderer";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom";

const mockStore = configureStore([]);
const store = mockStore({
  setReducer: AuthState,
});

const setupRender = () => {
  const component = render(
    <Provider store={store}>
      <Alerts />
    </Provider>,
  );
  return component;
};
const submit = jest.fn();
submit.mockReturnValue("default");

describe("Render connected React-redux page", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = setupRender();
  });
  it("should create snapshot for <Alerts/>", () => {
    expect(
      renderer
        .create(
          <Provider store={store}>
            <Alerts />
          </Provider>,
        )
        .toJSON(),
    ).toMatchSnapshot();
  });

  it("should render <Alerts/>", () => {
    const renderedComponent = wrapper.getByTitle("alert message");
    expect(renderedComponent).toBeInTheDocument();
  });
});
