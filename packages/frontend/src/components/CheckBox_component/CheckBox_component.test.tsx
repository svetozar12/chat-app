import CheckBox_component from "./CheckBox_component";
import renderer from "react-test-renderer";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

const submit: any = jest.fn();
const setupRender = () => {
  const component = render(<CheckBox_component item={"greg"} invited={["greg", "ivan"]} setInvited={submit} />);
  return component;
};

describe("Render connected React-redux page", () => {
  beforeEach(() => {
    setupRender();
  });
  it("should create snapshot for <CheckBox_component/>", () => {
    expect(renderer.create(<CheckBox_component item={"greg"} invited={["greg", "ivan"]} setInvited={submit} />).toJSON()).toMatchSnapshot();
  });

  it("should render <CheckBox_component/>", () => {
    const renderedComponent = screen.getByTitle("checkbox");
    expect(renderedComponent).toBeInTheDocument();
  });
});
