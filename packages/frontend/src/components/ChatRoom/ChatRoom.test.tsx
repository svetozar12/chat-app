import ChatRoom from "../ChatRoom";
import renderer from "react-test-renderer";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import configureStore from "redux-mock-store";
import { Provider } from "react-redux";
import { initialState } from "../../redux/reducer/setReducer";
import Cookies from "universal-cookie";

const mockStore = configureStore([]);
const store = mockStore({
  setReducer: initialState,
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
    render(
      <Provider store={store}>
        <ChatRoom cookie={cookie} chatId={"321312313"} />
      </Provider>,
    );
    const renderedComponent = screen.getByRole("textbox");
    expect(renderedComponent).toBeInTheDocument();
  });
});
