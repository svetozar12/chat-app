import ChatRoom from "../ChatRoom";
import renderer from "react-test-renderer";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import configureStore from "redux-mock-store";
import { Provider } from "react-redux";
import { initialState as setState } from "../../redux/reducer/setReducer/setReducer";
import { initialState as messageState } from "../../redux/reducer/messageReducer/messageReducer";
import Cookies from "universal-cookie";

const mockStore = configureStore([]);
const store = mockStore({
  setReducer: setState,
  messageReducer: messageState,
});

jest.mock("next/router", () => ({
  useRouter() {
    return {
      prefetch: () => null,
    };
  },
}));

const cookie = new Cookies({ name: "TestName" });

describe("Render connected React-redux page", () => {
  it("should create snapshot for <ChatRoom/>", () => {
    expect(
      renderer
        .create(
          <Provider store={store}>
            <ChatRoom cookie={cookie} chatId={"321312313"} />
          </Provider>,
        )
        .toJSON(),
    ).toMatchSnapshot();
  });

  it("should render <ChatRoom/>", () => {
    screen.getByRole("");
    render(
      <Provider store={store}>
        <ChatRoom cookie={cookie} chatId={"321312313"} />
      </Provider>,
    );
    const renderedComponent = screen.getByRole("textbox");
    expect(renderedComponent).toBeInTheDocument();
  });
});
