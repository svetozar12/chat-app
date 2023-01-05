import { Gender } from "../../gql-sdk/generated";
import { sdk } from "../support/commands";

describe("example to-do app", () => {
  const fields = [
    {
      name: "input[name=username]",
      value: "test",
    },
    {
      name: "input[name=password]",
      value: "test",
    },
  ];
  before(async () => {
    await sdk.CreateUser({
      user: {
        username: "test",
        email: "test@.com",
        gender: Gender.Male,
        password: "test",
      },
    });
  });
  beforeEach(() => {
    cy.visit("/");
    cy.url().should("eq", "http://localhost:3000/");
  });
  after(async () => {
    const { userId, AccessToken } = await cy.getAuth("test", "test");
    await sdk.DeleteUser({ auth: { userId, AccessToken } });
  });

  it("open chat", () => {
    fields.forEach(({ name, value }) => {
      cy.get(name).type(value).should("have.value", value);
    });
    cy.get("button").contains("Login").click();

    cy.getAuth("test", "test");
    cy.getAllChats().then(({ res: [{ _id }] }) => {
      const chatId = _id;
      cy.url().should("eq", `http://localhost:3000/${chatId}`);
    });
  });
});
