import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import LoginForm from "../src/components/LoginForm";
import renderer from "react-test-renderer";
import { AuthState } from "../src/redux/reducer/authReducer";

let component: any;

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
});

describe("Render connected React-redux page", () => {
  it("should render with given state  from Redux state", () => {
    expect(component).toMatchSnapshot();
  });
});
