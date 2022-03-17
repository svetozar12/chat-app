import "@testing-library/jest-dom";
import MainSection from "./MainSection";
import renderer from "react-test-renderer";
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { initialState } from "../../redux/reducer/setReducer";
import { initialState as saveInputState } from "../../redux/reducer/save_inputReducer";
import MockedSocket from "socket.io-mock";
import configureStore from "redux-mock-store";
import Cookies from "universal-cookie";

let socket = new MockedSocket();
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

const cookie: any = new Cookies({ name: "TestName" });

const setupRender = () => {
  const component = render(
    <Provider store={store}>
      <MainSection chatRooms={[{ _id: "31231312", members: ["ivan", "greg"] }]} cookie={cookie} socketRef={socket} chatId="3213123123" />
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
            <MainSection
              chatRooms={[{ _id: "31231312", members: ["ivan", "greg"] }]}
              cookie={cookie}
              socketRef={socket}
              chatId="3213123123"
            />
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
