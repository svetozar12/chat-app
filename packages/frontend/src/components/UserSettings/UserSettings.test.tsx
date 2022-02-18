import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import UserSettings from "./UserSettings";
import { Provider } from "react-redux";
import { initialState } from "../../redux/reducer/setReducer";
import configureStore from "redux-mock-store";
import renderer from "react-test-renderer";
const mockStore = configureStore([]);
const store = mockStore({
  setReducer: initialState,
});

describe("<UserSettings/>", () => {
  it("should create snapshot", () => {
    expect(
      renderer
        .create(
          <Provider store={store}>
            <UserSettings cookie="test2" />
          </Provider>,
        )
        .toJSON(),
    ).toMatchSnapshot();
  });
  it("should render", () => {
    render(
      <Provider store={store}>
        <UserSettings cookie="test2" />
      </Provider>,
    );
    const test = screen.getByTestId("user_settings");
    expect(test).toBeInTheDocument();
  });
});
