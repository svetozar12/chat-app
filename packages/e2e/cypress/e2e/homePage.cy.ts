import { Gender } from "../../gql-sdk/generated";
import { sdk } from "../support/commands";

describe("example to-do app", () => {
  before(async () => {
    await sdk.CreateUser({
      user: {
        username: "test",
        email: "test@.com",
        gender: Gender.Male,
        password: "test",
      },
    });
    cy.getAuth("test", "test");
  });
  beforeEach(() => {
    cy.getAllChats().then(({ res: [{ _id }] }) => {
      const chatId = _id;
      cy.visit(`http://localhost:3000/${chatId}`);
      cy.url().should("eq", `http://localhost:3000/${chatId}`);
    });
  });
  after(async () => {
    await cy.deleteUser();
  });

  it("open chat", () => {
    cy.getAllChats().then(({ res: [{ _id }] }) => {
      const chatId = _id;
      cy.url().should("eq", `http://localhost:3000/${chatId}`);
    });
  });
});
