import RegisterForm from "../RegisterForm";
import renderer from "react-test-renderer";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
// services
import { initialState } from "../../services/redux/reducer/authReducer/authReducer";
import { initialState as saveInputState } from "../../services/redux/reducer/save_inputReducer/save_inputReducer";
const quickLogin: any = jest.fn();
const handleSubmit = jest.fn();

const mockStore = configureStore([]);
const store = mockStore({
  authReducer: initialState,
  saveInputReducer: saveInputState,
});

const setupRender = () => {
  const component = render(
    <Provider store={store}>
      <RegisterForm quickLogin={quickLogin} isLogging={false} handleSubmit={handleSubmit} />
    </Provider>,
  );
  return component;
};

describe("Render connected React-redux page", () => {
  beforeEach(() => {
    setupRender();
  });
  it("should create snapshot for <RegisterForm/>", () => {
    expect(
      renderer
        .create(
          <Provider store={store}>
            <RegisterForm quickLogin={quickLogin} isLogging={false} handleSubmit={handleSubmit} />
          </Provider>,
        )
        .toJSON(),
    ).toMatchSnapshot();
  });

  it("should render <RegisterForm/>", () => {
    const renderedComponent = screen.getByTitle("register_form");
    expect(renderedComponent).toBeInTheDocument();
  });
});
