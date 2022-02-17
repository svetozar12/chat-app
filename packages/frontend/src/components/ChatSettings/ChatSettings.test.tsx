import ChatSettings from "../ChatSettings/ChatSettings";
import renderer from "react-test-renderer";
import { render, cleanup, RenderResult } from "@testing-library/react";
import { ReactTestRendererJSON } from "react-test-renderer";
import "@testing-library/jest-dom";
import configureStore from "redux-mock-store";
import { Provider } from "react-redux";
import { initialState as setState } from "../../redux/reducer/setReducer";
let component: ReactTestRendererJSON | ReactTestRendererJSON[] | null;
let container: RenderResult;
const submit: any = jest.fn();

beforeEach(() => {
  const mockStore = configureStore([]);
  const store = mockStore({
    setReducer: setState,
  });
  component = renderer
    .create(
      <Provider store={store}>
        <ChatSettings
          cookieName={"greg"}
          socketRef={submit}
          setLocalStatus={submit}
          chatId={"321312313"}
        />
      </Provider>,
    )
    .toJSON();

  container = render(
    <Provider store={store}>
      <ChatSettings
        cookieName={"greg"}
        socketRef={submit}
        setLocalStatus={submit}
        chatId={"321312313"}
      />
    </Provider>,
  );
});

afterEach(cleanup);

describe("Render connected React-redux page", () => {
  it("should create snapshot for <ChatSettings/>", () => {
    expect(component).toMatchSnapshot();
  });

  it("should render <ChatSettings/>", () => {
    const renderedComponent = container.getByText("Members in chat");
    expect(renderedComponent).toBeInTheDocument();
  });
});
