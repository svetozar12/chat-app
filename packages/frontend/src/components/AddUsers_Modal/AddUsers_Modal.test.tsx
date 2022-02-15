import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import { AddUsers_Modal } from "components/AddUsers_Modal/AddUsers_Modal";
import renderer from "react-test-renderer";
import { AuthState } from "redux/reducer/authReducer";
import { render, cleanup, RenderResult } from "@testing-library/react";
import { ReactTestRendererJSON } from "react-test-renderer";
import "@testing-library/jest-dom";

let component: ReactTestRendererJSON | ReactTestRendererJSON[] | null;
let container: RenderResult;
const submit: any = jest.fn();

beforeEach(() => {
  const mockStore = configureStore([]);
  const store = mockStore({
    authReducer: AuthState,
  });

  component = renderer
    .create(
      <Provider store={store}>
        <AddUsers_Modal
          users={["ivan", "greg"]}
          socketRef={submit}
          setLocalStatus={submit}
          setUsers={submit}
          chatId={"321312312321"}
        />
      </Provider>,
    )
    .toJSON();

  container = render(
    <Provider store={store}>
      <AddUsers_Modal
        users={["ivan", "greg"]}
        socketRef={submit}
        setLocalStatus={submit}
        setUsers={submit}
        chatId={"321312312321"}
      />
    </Provider>,
  );
});

afterEach(cleanup);

describe("Render connected React-redux page", () => {
  it("should create snapshot for <AddUsers_Modal/>", () => {
    expect(component).toMatchSnapshot();
  });

  it("should render <AddUsers_Modal/>", () => {
    const renderedComponent = container.getByText("Add people");
    expect(renderedComponent).toBeInTheDocument();
  });
});
