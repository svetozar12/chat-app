import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import RenderChat from "../RenderChat";
import renderer from "react-test-renderer";
import { getFirstChat } from "../../../utils/getFirstChat";
import { Provider } from "react-redux";
import { initialState } from "../../../redux/reducer/messageReducer";
import configureStore from "redux-mock-store";

const mockStore = configureStore([]);
const store = mockStore({
  messageReducer: { ...initialState, messages: [{ _id: "321313123123", sender: "test1", message: "hello", createdAt: "1111" }] },
});

describe("<RenderChat/>", () => {
  const chatId: any = getFirstChat("test1");
  it("should create snapshot", () => {
    const tree = renderer
      .create(
        <Provider store={store}>
          <RenderChat id={"321312312312"} chatId={chatId._id} sender="test1" time_stamp="1111" message="hello" cookie="test2" />
        </Provider>,
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
  it("should render", () => {
    const container = render(
      <Provider store={store}>
        <RenderChat id={"321312312312"} chatId={chatId._id} sender="test1" time_stamp="1111" message="hello" cookie="test2" />
      </Provider>,
    );
    const test = container.getByText("hello");
    expect(test).toBeInTheDocument();
  });
});
