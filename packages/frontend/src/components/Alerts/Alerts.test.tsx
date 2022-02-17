import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import { AuthState } from "../../redux/reducer/authReducer";
import { Alerts } from "../Alerts/Alerts";
import renderer from "react-test-renderer";
import { render, cleanup, RenderResult } from "@testing-library/react";
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
  });

  component = renderer
    .create(
      <Provider store={store}>
        <Alerts />
      </Provider>,
    )
    .toJSON();

  container = render(
    <Provider store={store}>
      <Alerts />
    </Provider>,
  );
});

afterEach(cleanup);

describe("Render connected React-redux page", () => {
  it("should create snapshot for <Alerts/>", () => {
    expect(component).toMatchSnapshot();
  });

  it("should render <Alerts/>", () => {
    const renderedComponent = container.getByTitle("alert message");
    expect(renderedComponent).toBeInTheDocument();
  });
});
