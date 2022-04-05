import RegisterForm from "../RegisterForm/RegisterForm";
import renderer from "react-test-renderer";
import { render, cleanup, RenderResult } from "@testing-library/react";
import { ReactTestRendererJSON } from "react-test-renderer";
import "@testing-library/jest-dom";
import { Provider } from "react-redux";
import { initialState } from "../../redux/reducer/authReducer";
import { initialState as saveInputState } from "../../redux/reducer/save_inputReducer";
import configureStore from "redux-mock-store";
let component: ReactTestRendererJSON | ReactTestRendererJSON[] | null;
let container: RenderResult;
const quickLogin: any = jest.fn();
const handleSubmit = jest.fn();

beforeEach(() => {
  const mockStore = configureStore([]);
  const store = mockStore({
    authReducer: initialState,
    saveInputReducer: saveInputState,
  });
  component = renderer
    .create(
      <Provider store={store}>
        <RegisterForm quickLogin={quickLogin} handleSubmit={handleSubmit} />
      </Provider>,
    )
    .toJSON();

  container = render(
    <Provider store={store}>
      <RegisterForm quickLogin={quickLogin} handleSubmit={handleSubmit} />
    </Provider>,
  );
});

afterEach(cleanup);

describe("Render connected React-redux page", () => {
  it("should create snapshot for <RegisterForm/>", () => {
    expect(component).toMatchSnapshot();
  });

  it("should render <RegisterForm/>", () => {
    const renderedComponent = container.getByTitle("register_form");
    expect(renderedComponent).toBeInTheDocument();
  });
});
