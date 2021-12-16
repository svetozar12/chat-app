import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import LoginForm from "../src/components/LoginForm";
import renderer from "react-test-renderer";
import { AuthState } from "../src/redux/reducer/authReducer";
import { render, cleanup, RenderResult } from "@testing-library/react";
import { ReactTestRendererJSON } from "react-test-renderer";
import "@testing-library/jest-dom";

let component: ReactTestRendererJSON | ReactTestRendererJSON[] | null;
let container: RenderResult;
const Mock = jest.fn();
const handleSubmit = Mock.bind({});

beforeEach(() => {
  const mockStore = configureStore([]);
  const store = mockStore({
    authReducer: AuthState,
  });

  component = renderer
    .create(
      <Provider store={store}>
        <LoginForm handleSubmit={handleSubmit} />
      </Provider>,
    )
    .toJSON();

  container = render(
    <Provider store={store}>
      <LoginForm handleSubmit={handleSubmit} />
    </Provider>,
  );
});

afterEach(cleanup);

describe("Render connected React-redux page", () => {
  it("should create snapshot for <LoginForm/>", () => {
    expect(component).toMatchSnapshot();
  });

  it("should render <LoginForm/>", () => {
    const test = container.getByText("Login");
    expect(test).toBeInTheDocument();
  });
  it("should call handleSubmit when button is clicked", () => {});
});
