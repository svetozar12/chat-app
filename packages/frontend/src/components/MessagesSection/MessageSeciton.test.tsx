import MessageSection from "./MessageSection";
import renderer from "react-test-renderer";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Provider } from "react-redux";
import { initialState } from "../../redux/reducer/setReducer/setReducer";
import { initialState as messageState } from "../../redux/reducer/messageReducer/messageReducer";
import configureStore from "redux-mock-store";
import Cookies from "universal-cookie";

const socketRef: any = jest.fn();
const mockStore = configureStore([]);
const store = mockStore({
  setReducer: initialState,
  messageReducer: messageState,
});

jest.mock("next/router", () => ({
  useRouter() {
    return {
      prefetch: () => null,
    };
  },
}));

jest.mock("react", () => ({
  ...jest.requireActual("react"),
  useEffect: jest.fn(),
  useRef: (arg) => (typeof arg === "undefined" ? { current: { getBoundingClientRect: () => ({ left: 0 }) } } : { current: arg }),
}));

const cookie: any = new Cookies({ name: "TestName" });

const setupRender = () => {
  const component = render(
    <Provider store={store}>
      <MessageSection
        contacts={[{ _id: "31231312", inviter: "ivan", reciever: "greg", status: "declined" }]}
        cookie={cookie}
        fetchInviteStatus={socketRef}
        fetchInviterStatus={socketRef}
        socketRef={socketRef}
        chatId="3213123123"
      />
    </Provider>,
  );
  return component;
};

describe("Render connected React-redux page", () => {
  beforeEach(() => {
    setupRender();
  });
  it("should create snapshot for <MessageSection/>", () => {
    expect(
      renderer
        .create(
          <Provider store={store}>
            <MessageSection
              contacts={[{ _id: "31231312", inviter: "ivan", reciever: "greg", status: "declined" }]}
              cookie={cookie}
              fetchInviteStatus={socketRef}
              fetchInviterStatus={socketRef}
              socketRef={socketRef}
              chatId="3213123123"
            />
          </Provider>,
        )
        .toJSON(),
    ).toMatchSnapshot();
  });

  it("should render <MessageSection/>", () => {
    screen.getByRole("");
    const renderedComponent = screen.getByTitle("message_section");
    expect(renderedComponent).toBeInTheDocument();
  });
});
