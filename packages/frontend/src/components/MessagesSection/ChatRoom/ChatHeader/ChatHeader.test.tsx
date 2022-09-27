import ChatHeader from "./ChatHeader";
import renderer from "react-test-renderer";
import { screen, render } from "@testing-library/react";
import "@testing-library/jest-dom";
import configureStore from "redux-mock-store";
import { Provider } from "react-redux";

const data = {
  reciever: "",
  chat_inviter: "",
  pageNumber: 2,
  setUserSettings: false,
  setFriendRequest: false,
  toggleCreateGroup: true,
  setMobileNav: false,
  setIsMatch: false,
  setChatSettings: false,
  setModalInvite: false,
};

const mockStore = configureStore([]);
const store = mockStore({
  setReducer: data,
});
const socketRef: any = jest.fn();

it("should create snapshot for <ChatHeader/>", () => {
  expect(
    renderer
      .create(
        <Provider store={store}>
          <ChatHeader socketRef={socketRef} />
        </Provider>,
      )
      .toJSON(),
  ).toMatchSnapshot();
});

it("should render <ChatHeader/>", () => {
  render(
    <Provider store={store}>
      <ChatHeader socketRef={socketRef} />
    </Provider>,
  );
  const renderedComponent = screen.getByTitle("chat_header");
  expect(renderedComponent).toBeInTheDocument();
});
