import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import LoginForm from "./LoginForm";
import renderer from "react-test-renderer";
import { AuthState } from "../../redux/reducer/authReducer";
import { render, cleanup, RenderResult } from "@testing-library/react";
import { initialState as inputState } from "../../redux/reducer/save_inputReducer";
import { ReactTestRendererJSON } from "react-test-renderer";
import "@testing-library/jest-dom";

let component: ReactTestRendererJSON | ReactTestRendererJSON[] | null;
let container: RenderResult;
const submit = jest.fn();
submit.mockReturnValue("default");

beforeAll(() => {
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

afterAll(cleanup);

describe("Render connected React-redux page", () => {
  it("should create snapshot for <LoginForm/>", () => {
    expect(component).toMatchSnapshot();
  });

  it("should render <LoginForm/>", () => {
    const renderedComponent = container.getByText("Log In");
    expect(renderedComponent).toBeInTheDocument();
  });
});
