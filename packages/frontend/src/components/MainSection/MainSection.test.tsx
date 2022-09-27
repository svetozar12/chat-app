import "@testing-library/jest-dom";
import MainSection from "./MainSection";
import renderer from "react-test-renderer";
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { initialState } from "../../services/redux/reducer/setReducer/setReducer";
import { initialState as saveInputState } from "../../services/redux/reducer/save_inputReducer/save_inputReducer";
import configureStore from "redux-mock-store";

const mockStore = configureStore([]);
const store = mockStore({
  setReducer: initialState,
  saveInputReducer: saveInputState,
});

jest.mock("next/router", () => ({
  useRouter() {
    return {
      prefetch: () => null,
    };
  },
}));

const setupRender = () => {
  const component = render(
    <Provider store={store}>
      <MainSection chatRooms={[{ _id: "31231312", members: ["ivan", "greg"] }]} chatId="3213123123" />
    </Provider>,
  );
  return component;
};

describe("Render connected React-redux page", () => {
  beforeEach(() => {
    setupRender();
  });
  it("should create snapshot for <MainSection/>", () => {
    expect(
      renderer
        .create(
          <Provider store={store}>
            <MainSection chatRooms={[{ _id: "31231312", members: ["ivan", "greg"] }]} chatId="3213123123" />
          </Provider>,
        )
        .toJSON(),
    ).toMatchSnapshot();
  });

  it("should render <MainSection/>", () => {
    const renderedComponent = screen.getByTitle("main_section");
    expect(renderedComponent).toBeInTheDocument();
  });
});
