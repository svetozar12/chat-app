import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import LoginForm from "../../src/components/LoginForm";
import renderer from "react-test-renderer";
import userEvent from "@testing-library/user-event";
import { AuthState } from "../../src/redux/reducer/authReducer";
import { render, screen, cleanup, RenderResult } from "@testing-library/react";
import { initialState as inputState } from "../../src/redux/reducer/save_inputReducer";
import { ReactTestRendererJSON } from "react-test-renderer";
import "@testing-library/jest-dom";

let component: ReactTestRendererJSON | ReactTestRendererJSON[] | null;
let container: RenderResult;
const submit = jest.fn();
submit.mockReturnValue("default");

beforeEach(() => {
  const mockStore = configureStore([]);
  const store = mockStore({
    authReducer: AuthState,
    saveInputReducer: inputState,
  });

  component = renderer
    .create(
      <Provider store={store}>
        <LoginForm handleSubmit={submit} />
      </Provider>,
    )
    .toJSON();

  container = render(
    <Provider store={store}>
      <LoginForm handleSubmit={submit} />
    </Provider>,
  );
});

afterEach(cleanup);

describe("Render connected React-redux page", () => {
  it("should create snapshot for <LoginForm/>", () => {
    expect(component).toMatchSnapshot();
  });

  it("should render <LoginForm/>", () => {
    const renderedComponent = container.getByText("Log In");
    expect(renderedComponent).toBeInTheDocument();
  });
  // test("input some data", () => {
  //   const username = screen.getByPlaceholderText("username ...");
  //   const password = screen.getByPlaceholderText("password ...");
  //   const text = "test";
  //   userEvent.paste(username, text);
  //   userEvent.paste(password, text);

  //   expect(username && password).toHaveValue(text);
  // });
  test("click checkBox for remember me", () => {
    userEvent.click(screen.getByText("Remember me"));
    expect(screen.getByLabelText("Remember me")).toBeChecked();
  });
  test("click login button and call function handleSubmit", () => {
    const button = screen.getByText("Log In");
    userEvent.click(button);
    expect(submit).toHaveBeenCalled();
  });
});
