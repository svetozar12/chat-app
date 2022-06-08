import configureStore from "redux-mock-store";
import AddGroupChat from "./AddGroupChat";
import renderer from "react-test-renderer";
import { Provider } from "react-redux";
import { AuthState } from "../../redux/reducer/authReducer/authReducer";
import { screen, render } from "@testing-library/react";
import "@testing-library/jest-dom";

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

const socketRef: any = jest.fn();
const mockStore = configureStore([]);
const store = mockStore({
  authReducer: AuthState,
  setReducer: data,
});

const setupRender = () => {
  const component = render(
    <Provider store={store}>
      <AddGroupChat cookieName="ivan" socketRef={socketRef} />
    </Provider>,
  );
  return component;
};

describe("Render connected React-redux page", () => {
  beforeEach(() => {
    setupRender();
  });
  it("should create snapshot for <AddGroupChat/>", () => {
    expect(
      renderer
        .create(
          <Provider store={store}>
            <AddGroupChat cookieName="ivan" socketRef={socketRef} />
          </Provider>,
        )
        .toJSON(),
    ).toMatchSnapshot();
  });

  it("should render <AddGroupChat/>", () => {
    const renderedComponent = screen.getByText("Create room");
    expect(renderedComponent).toBeInTheDocument();
  });
});
