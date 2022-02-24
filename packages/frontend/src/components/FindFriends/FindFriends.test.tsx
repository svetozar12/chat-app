import configureStore from "redux-mock-store";
import FindFriends from "../FindFriends/FindFriends";
import renderer from "react-test-renderer";
import { Provider } from "react-redux";
import { AuthState } from "../../redux/reducer/authReducer";
import saveInputReducer from "../../redux/reducer/save_inputReducer";
import { screen, render } from "@testing-library/react";
import "@testing-library/jest-dom";

const socketRef: any = jest.fn();
const cookie: any = jest.fn();
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
  authReducer: AuthState,
  setReducer: data,
  saveInputReducer: saveInputReducer,
});

const setupRender = () => {
  const component = render(
    <Provider store={store}>
      <FindFriends cookie={cookie} cookieName="ivan" socketRef={socketRef} />
    </Provider>,
  );
  return component;
};

describe("Render connected React-redux page", () => {
  beforeEach(() => {
    setupRender();
  });
  it("should create snapshot for <FindFriends/>", () => {
    expect(
      renderer
        .create(
          <Provider store={store}>
            <FindFriends cookie={cookie} cookieName="ivan" socketRef={socketRef} />
          </Provider>,
        )
        .toJSON(),
    ).toMatchSnapshot();
  });

  it("should render <FindFriends/>", () => {
    const renderedComponent = screen.getByRole("searchbox");
    expect(renderedComponent).toBeInTheDocument();
  });
});
