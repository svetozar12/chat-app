import ActiveChats from "./ActiveChats";
import configureStore from "redux-mock-store";
import { Provider } from "react-redux";
import { initialState } from "../../redux/reducer/setReducer";
import "@testing-library/jest-dom";
import renderer from "react-test-renderer";
import { render, screen } from "@testing-library/react";

const socketRef: any = jest.fn();
const dumy: string[] = ["ivan", "gerg"];
const mockStore = configureStore([]);
const store = mockStore({
  setReducer: initialState,
});

const setupRender = () => {
  const component = render(
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
  return component;
};

describe("<ActiveChats/>", () => {
  beforeEach(() => {
    setupRender();
  });
  it("should create snapshot", () => {
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
  it("should render", () => {
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
    expect(screen.getAllByTitle("ivan")[0]).toBeInTheDocument();
  });
});
