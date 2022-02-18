import ChatRoom from "../ChatRoom/ChatRoom";
import renderer from "react-test-renderer";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import configureStore from "redux-mock-store";
import { Provider } from "react-redux";
import { initialState } from "../../redux/reducer/setReducer";
const mockStore = configureStore([]);
const store = mockStore({
  setReducer: initialState,
});

const cookie = jest.fn();

describe("Render connected React-redux page", () => {
  it("should create snapshot for <ChatRoom/>", () => {
    Object.defineProperty(window.document, "cookie", {
      writable: true,
      value: "name=TestName",
    });
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
    render(
      <Provider store={store}>
        <ChatRoom cookie={cookie} chatId={"321312313"} />
      </Provider>,
    );
    const renderedComponent = screen.getByRole("textarea");
    expect(renderedComponent).toBeInTheDocument();
  });
});
