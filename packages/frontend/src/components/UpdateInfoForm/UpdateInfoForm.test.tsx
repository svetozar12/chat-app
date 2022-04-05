import { UpdateInfoForm } from "../UpdateInfoForm/UpdateInfoForm";
import { Provider } from "react-redux";
import { initialState as saveInputState } from "../../redux/reducer/save_inputReducer";
import configureStore from "redux-mock-store";
import renderer from "react-test-renderer";
import { render, cleanup, RenderResult } from "@testing-library/react";
import { ReactTestRendererJSON } from "react-test-renderer";
import "@testing-library/jest-dom";

let component: ReactTestRendererJSON | ReactTestRendererJSON[] | null;
let container: RenderResult;
const mockFunc: any = jest.fn();
const mockStore = configureStore([]);
const store = mockStore({
  saveInputReducer: saveInputState,
});
beforeEach(() => {
  component = renderer
    .create(
      <Provider store={store}>
        <UpdateInfoForm
          url="random.png"
          setImage={mockFunc}
          cookieName="greg"
          handleSubmit={mockFunc}
        />
      </Provider>,
    )
    .toJSON();

  container = render(
    <Provider store={store}>
      <UpdateInfoForm
        url="random.png"
        setImage={mockFunc}
        cookieName="greg"
        handleSubmit={mockFunc}
      />
    </Provider>,
  );
});

afterEach(cleanup);

describe("Render connected React-redux page", () => {
  it("should create snapshot for <UpdateInfoForm/>", () => {
    expect(component).toMatchSnapshot();
  });

  it("should render <UpdateInfoForm/>", () => {
    const renderedComponent = container.getByTitle("user_settings");
    expect(renderedComponent).toBeInTheDocument();
  });
});
