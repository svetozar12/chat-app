import Notifications_Modal from "./Notifications_Modal";
import renderer from "react-test-renderer";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Provider } from "react-redux";
import { initialState } from "../../redux/reducer/setReducer";
import configureStore from "redux-mock-store";

const socketRef: any = jest.fn();
const mockStore = configureStore([]);
const store = mockStore({
  setReducer: initialState,
});

const setupRender = () => {
  const component = render(
    <Provider store={store}>
      <Notifications_Modal contacts={[{ _id: "31231312", inviter: "ivan", reciever: "greg", status: "declined" }]} socketRef={socketRef} />
    </Provider>,
  );
  return component;
};

describe("Render connected React-redux page", () => {
  beforeEach(() => {
    setupRender();
  });
  it("should create snapshot for <Notifications_Modal/>", () => {
    expect(
      renderer
        .create(
          <Provider store={store}>
            <Notifications_Modal
              contacts={[{ _id: "31231312", inviter: "ivan", reciever: "greg", status: "accepted" }]}
              socketRef={socketRef}
            />
          </Provider>,
        )
        .toJSON(),
    ).toMatchSnapshot();
  });

  it("should render <Notifications_Modal/>", () => {
    const renderedComponent = screen.getByText("Notifications");
    expect(renderedComponent).toBeInTheDocument();
  });
});
