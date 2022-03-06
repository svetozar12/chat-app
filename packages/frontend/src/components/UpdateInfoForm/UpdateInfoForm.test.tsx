import UpdateInfoForm from "../UpdateInfoForm";
import { Provider } from "react-redux";
import { initialState as saveInputState } from "../../redux/reducer/save_inputReducer";
import configureStore from "redux-mock-store";
import renderer from "react-test-renderer";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

const mockFunc: any = jest.fn();
const mockStore = configureStore([]);
const store = mockStore({
  saveInputReducer: saveInputState,
});

const setupRender = () => {
  const componet = render(
    <Provider store={store}>
      <UpdateInfoForm url="random.png" setImage={mockFunc} cookieName="greg" handleSubmit={mockFunc} />
    </Provider>,
  );
  return componet;
};

describe("Render connected React-redux page", () => {
  beforeEach(() => {
    setupRender;
  });
  it("should create snapshot for <UpdateInfoForm/>", () => {
    expect(
      renderer
        .create(
          <Provider store={store}>
            <UpdateInfoForm url="random.png" setImage={mockFunc} cookieName="greg" handleSubmit={mockFunc} />
          </Provider>,
        )
        .toJSON(),
    ).toMatchSnapshot();
  });

  it("should render <UpdateInfoForm/>", () => {
    const renderedComponent = screen.getByTitle("user_settings");
    expect(renderedComponent).toBeInTheDocument();
  });
});
