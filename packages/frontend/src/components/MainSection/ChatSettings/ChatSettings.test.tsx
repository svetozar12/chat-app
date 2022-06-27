import ChatSettings from "../ChatSettings";
import renderer from "react-test-renderer";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import configureStore from "redux-mock-store";
import { Provider } from "react-redux";
import { initialState as setState } from "services/redux/reducer/setReducer/setReducer";
const mockStore = configureStore([]);
const store = mockStore({
  setReducer: setState,
});
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
            <ChatSettings chatId={"321312313"} />
          </Provider>,
        )
        .toJSON(),
    ).toMatchSnapshot();
  });

  it("should render <ChatSettings/>", () => {
    render(
      <Provider store={store}>
        <ChatSettings chatId={"321312313"} />
      </Provider>,
    );
    const renderedComponent = screen.getByText("Members in chat");
    expect(renderedComponent).toBeInTheDocument();
  });
});
