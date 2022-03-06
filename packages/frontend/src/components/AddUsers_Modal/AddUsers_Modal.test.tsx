import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import AddUsers_Modal from "../AddUsers_Modal";
import renderer from "react-test-renderer";
import { AuthState } from "../../redux/reducer/authReducer";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import React from "react";
const submit: any = jest.fn();
const mockStore = configureStore([]);
const store = mockStore({
  authReducer: AuthState,
});

const setupRender = () => {
  const component = render(
    <Provider store={store}>
      <AddUsers_Modal users={["ivan", "greg"]} socketRef={submit} setLocalStatus={submit} setUsers={submit} chatId={"321312312321"} />
    </Provider>,
  );
  return component;
};

describe("Render connected React-redux page", () => {
  beforeEach(() => {
    setupRender();
  });
  it("should create snapshot for <AddUsers_Modal/>", () => {
    expect(
      renderer
        .create(
          <Provider store={store}>
            <AddUsers_Modal users={["ivan", "greg"]} socketRef={submit} setLocalStatus={submit} setUsers={submit} chatId={"321312312321"} />
          </Provider>,
        )
        .toJSON(),
    ).toMatchSnapshot();
  });

  it("should render <AddUsers_Modal/>", () => {
    const renderedComponent = screen.getByText("Add people");
    expect(renderedComponent).toBeInTheDocument();
  });
});
