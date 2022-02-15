import { UpdateInfoForm } from "components/UpdateInfoForm/UpdateInfoForm";
import renderer from "react-test-renderer";
import { render, cleanup, RenderResult } from "@testing-library/react";
import { ReactTestRendererJSON } from "react-test-renderer";
import "@testing-library/jest-dom";

let component: ReactTestRendererJSON | ReactTestRendererJSON[] | null;
let container: RenderResult;
const mockFunc: any = jest.fn();

beforeEach(() => {
  component = renderer
    .create(
      <UpdateInfoForm
        url="random.png"
        setImage={mockFunc}
        cookieName="greg"
        handleSubmit={mockFunc}
      />,
    )
    .toJSON();

  container = render(
    <UpdateInfoForm
      url="random.png"
      setImage={mockFunc}
      cookieName="greg"
      handleSubmit={mockFunc}
    />,
  );
});

afterEach(cleanup);

describe("Render connected React-redux page", () => {
  it("should create snapshot for <UpdateInfoForm/>", () => {
    expect(component).toMatchSnapshot();
  });

  it("should render <UpdateInfoForm/>", () => {
    const renderedComponent = container.getByRole("form");
    expect(renderedComponent).toBeInTheDocument();
  });
});
