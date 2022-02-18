import ActiveChats from "./ActiveChats";
import configureStore from "redux-mock-store";
import { Provider } from "react-redux";
import { initialState } from "../../redux/reducer/setReducer";
import "@testing-library/jest-dom";
import renderer from "react-test-renderer";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

const socketRef: any = jest.fn();
const dumy: string[] = ["ivan", "gerg"];
const mockStore = configureStore([]);
const store = mockStore({
  setReducer: initialState,
});

it("should create snapshot for <ActiveChats/>", () => {
  expect(
    renderer
      .create(
        <Provider store={store}>
          <ActiveChats
            _id="61c4957b735b579e5442dfe8"
            chatId="61c4957b735b579e5442dfe8"
            members={dumy}
            cookieName="ivan"
            socketRef={socketRef}
          />
        </Provider>,
      )
      .toJSON(),
  ).toMatchSnapshot();
});
it("should render <ActiveChats/>", () => {
  render(
    <Provider store={store}>
      <ActiveChats
        _id="61c4957b735b579e5442dfe8"
        chatId="61c4957b735b579e5442dfe8"
        members={dumy}
        cookieName="ivan"
        socketRef={socketRef}
      />
    </Provider>,
  );
  expect(screen.getByTestId("chat")).toBeInTheDocument();
});
