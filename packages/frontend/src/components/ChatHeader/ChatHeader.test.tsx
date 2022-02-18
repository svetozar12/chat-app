import ChatHeader from "./ChatHeader";
import renderer from "react-test-renderer";
import { screen, render } from "@testing-library/react";
import "@testing-library/jest-dom";
import configureStore from "redux-mock-store";
import { Provider } from "react-redux";
import { initialState } from "../../redux/reducer/setReducer";

const mockStore = configureStore([]);
const store = mockStore({
  setReducer: initialState,
});
const socketRef: any = jest.fn();

it("should create snapshot for <ChatHeader/>", () => {
  expect(
    renderer
      .create(
        <Provider store={store}>
          <ChatHeader cookieName={"greg"} socketRef={socketRef} />
        </Provider>,
      )
      .toJSON(),
  ).toMatchSnapshot();
});

it("should render <ChatHeader/>", () => {
  render(
    <Provider store={store}>
      <ChatHeader cookieName={"greg"} socketRef={socketRef} />
    </Provider>,
  );
  const renderedComponent = screen.getByTitle("chat_header");
  expect(renderedComponent).toBeInTheDocument();
});
