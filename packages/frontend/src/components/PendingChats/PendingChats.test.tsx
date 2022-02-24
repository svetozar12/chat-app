import PendingChats from "../PendingChats/PendingChats";
import renderer from "react-test-renderer";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

const socketRef: any = jest.fn();
const setLocalStatus = jest.fn();

const setupRender = () => {
  const component = render(
    <PendingChats
      _id="61c4957b735b579e5442dfe8"
      inviter="ivan"
      reciever="gosho"
      socketRef={socketRef}
      setLocalStatus={setLocalStatus}
      status="recieved"
    />,
  );
  return component;
};

describe("Render connected React-redux page", () => {
  beforeEach(() => {
    setupRender();
  });
  it("should create snapshot for <PendingChats/>", () => {
    expect(
      renderer
        .create(
          <PendingChats
            _id="61c4957b735b579e5442dfe8"
            inviter="ivan"
            reciever="gosho"
            socketRef={socketRef}
            setLocalStatus={setLocalStatus}
            status="recieved"
          />,
        )
        .toJSON(),
    ).toMatchSnapshot();
  });

  it("should render <PendingChats/>", () => {
    const renderedComponent = screen.getByText("ivan");
    expect(renderedComponent).toBeInTheDocument();
  });
});
