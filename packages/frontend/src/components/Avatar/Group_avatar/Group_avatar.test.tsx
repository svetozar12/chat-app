import Group_avatar from "../Group_avatar/Group_avatar";
import renderer from "react-test-renderer";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import { initialState } from "../../../redux/reducer/authReducer";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

const mockStore = configureStore([]);
const store = mockStore({
  setReducer: initialState,
});

describe("Render connected React-redux page", () => {
  it("should create snapshot for <LoginForm/>", () => {
    expect(
      renderer
        .create(
          <Group_avatar
            inviter={"ivan"}
            cookieName={"greg"}
            members={["ivan", "greg"]}
          />,
        )
        .toJSON(),
    ).toMatchSnapshot();
  });

  it("should render <Group_avatar/>", () => {
    render(
      <Group_avatar
        inviter={"ivan"}
        cookieName={"greg"}
        members={["ivan", "greg"]}
      />,
    );
    const renderedComponent = screen.getByTitle(`groupChat-greg`);
    expect(renderedComponent).toBeInTheDocument();
  });
});
