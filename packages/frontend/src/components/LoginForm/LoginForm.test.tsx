import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import LoginForm from "./LoginForm";
import renderer from "react-test-renderer";
import { AuthState } from "../../redux/reducer/authReducer";
import { render, screen } from "@testing-library/react";
import { initialState as inputState } from "../../redux/reducer/save_inputReducer";
import "@testing-library/jest-dom";

const submit = jest.fn();
submit.mockReturnValue("default");
const mockStore = configureStore([]);
const store = mockStore({
  authReducer: AuthState,
  saveInputReducer: inputState,
});

it("should create snapshot for <LoginForm/>", () => {
  expect(
    renderer
      .create(
        <Provider store={store}>
          <LoginForm handleSubmit={submit} />
        </Provider>,
      )
      .toJSON(),
  ).toMatchSnapshot();
});

it("should render <LoginForm/>", () => {
  render(
    <Provider store={store}>
      <LoginForm handleSubmit={submit} />
    </Provider>,
  );
  const renderedComponent = screen.getByText("Log In");
  expect(renderedComponent).toBeInTheDocument();
});
