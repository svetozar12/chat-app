import RegisterForm from "components/RegisterForm/RegisterForm";
import renderer from "react-test-renderer";
import { render, cleanup, RenderResult } from "@testing-library/react";
import { ReactTestRendererJSON } from "react-test-renderer";
import "@testing-library/jest-dom";

let component: ReactTestRendererJSON | ReactTestRendererJSON[] | null;
let container: RenderResult;
const quickLogin: any = jest.fn();
const handleSubmit = jest.fn();

beforeEach(() => {
  component = renderer
    .create(
      <RegisterForm quickLogin={quickLogin} handleSubmit={handleSubmit} />,
    )
    .toJSON();

  container = render(
    <RegisterForm quickLogin={quickLogin} handleSubmit={handleSubmit} />,
  );
});

afterEach(cleanup);

describe("Render connected React-redux page", () => {
  it("should create snapshot for <RegisterForm/>", () => {
    expect(component).toMatchSnapshot();
  });

  it("should render <RegisterForm/>", () => {
    const renderedComponent = container.getByText("ivan");
    expect(renderedComponent).toBeInTheDocument();
  });
});
