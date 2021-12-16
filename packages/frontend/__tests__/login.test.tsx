import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import LoginForm from "../src/components/LoginForm";
import renderer from "react-test-renderer";
import { AuthState } from "../src/redux/reducer/authReducer";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom";

let component: any;
let container: any;

beforeEach(() => {
  const mockStore = configureStore([]);
  const store = mockStore({
    authReducer: AuthState,
  });

  component = renderer
    .create(
      <Provider store={store}>
        <LoginForm />
      </Provider>,
    )
    .toJSON();

  container = render(
    <Provider store={store}>
      <LoginForm />
    </Provider>,
  );
});

describe("Render connected React-redux page", () => {
  it("should create snapshot for <LoginForm/>", () => {
    expect(component).toMatchSnapshot();
  });

  it("should render <LoginForm/>", () => {
    const test = container.getByText("Login");
    expect(test).toBeInTheDocument();
  });
});
