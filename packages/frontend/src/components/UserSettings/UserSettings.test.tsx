import "@testing-library/jest-dom";
import { cleanup, render, screen } from "@testing-library/react";
import UserSettings from "./UserSettings";
import { Provider } from "react-redux";
import { initialState } from "redux/reducer/setReducer";
import configureStore from "redux-mock-store";
import renderer from "react-test-renderer";
let container;
beforeAll(() => {
  const mockStore = configureStore([]);
  const store = mockStore({
    setReducer: initialState,
  });
  container = renderer
    .create(
      <Provider store={store}>
        <UserSettings cookie="test2" />
      </Provider>,
    )
    .toJSON();
  render(
    <Provider store={store}>
      <UserSettings cookie="test2" />
    </Provider>,
  );
});

afterAll(cleanup);

describe("<UserSettings/>", () => {
  it("should create snapshot", () => {
    expect(container).toMatchSnapshot();
  });
  it("should render", () => {
    const test = screen.getByTestId("user_settings");
    expect(test).toBeInTheDocument();
  });
});
