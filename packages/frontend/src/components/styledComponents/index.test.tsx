/** @jsx jsx */
import renderer from "react-test-renderer";
import * as exports from "./index";
import { jsx } from "@emotion/react";
import { createSerializer } from "@emotion/jest";

expect.addSnapshotSerializer(createSerializer());

test("Renders Label_container", () => {
  expect(renderer.create(<exports.Label_container>hi</exports.Label_container>).toJSON()).toMatchSnapshot();
});
test("Renders Form_header", () => {
  expect(renderer.create(<exports.Form_header>hi</exports.Form_header>).toJSON()).toMatchSnapshot();
});
test("Renders Form", () => {
  expect(renderer.create(<exports.Form>hi</exports.Form>).toJSON()).toMatchSnapshot();
});
test("Renders Button", () => {
  expect(renderer.create(<exports.Button>hi</exports.Button>).toJSON()).toMatchSnapshot();
});
test("Renders Input", () => {
  expect(renderer.create(<exports.Input>hi</exports.Input>).toJSON()).toMatchSnapshot();
});
test("Renders Label_button", () => {
  expect(renderer.create(<exports.Label_button>hi</exports.Label_button>).toJSON()).toMatchSnapshot();
});
