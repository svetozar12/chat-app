import ChatSettings from "../ChatSettings/ChatSettings";
import renderer from "react-test-renderer";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import configureStore from "redux-mock-store";
import { Provider } from "react-redux";
import { initialState as setState } from "../../redux/reducer/setReducer";
import SocketMock from "socket.io-mock";
const submit: any = jest.fn();
const mockStore = configureStore([]);
const store = mockStore({
  setReducer: setState,
});
let socket = new SocketMock();
jest.mock("next/router", () => ({
  useRouter() {
    return {
      prefetch: () => null,
    };
  },
}));

describe("Render connected React-redux page", () => {
  it("should create snapshot for <ChatSettings/>", () => {
    expect(
      renderer
        .create(
          <Provider store={store}>
            <ChatSettings
              cookieName={"greg"}
              socketRef={socket}
              setLocalStatus={submit}
              chatId={"321312313"}
            />
          </Provider>,
        )
        .toJSON(),
    ).toMatchSnapshot();
  });

  it("should render <ChatSettings/>", () => {
    render(
      <Provider store={store}>
        <ChatSettings
          cookieName={"greg"}
          socketRef={socket}
          setLocalStatus={submit}
          chatId={"321312313"}
        />
      </Provider>,
    );
    const renderedComponent = screen.getByText("Members in chat");
    expect(renderedComponent).toBeInTheDocument();
  });
});
