import { sdk } from "../../support/commands";

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
    {
      name: "input[name=email]",
      value: "test@test.com",
    },
  ];
  beforeEach(() => {
    cy.visit("/register");
    cy.url().should("eq", "http://localhost:3000/register");
  });
  after(async () => {
    const { userId, AccessToken } = await cy.getAuth("test", "test");
    await sdk.DeleteUser({ auth: { userId, AccessToken } });
  });

  it("Registration and Login", () => {
    fields.forEach(({ name, value }) => {
      cy.get(name).type(value).should("have.value", value);
    });
    cy.get("input[id=Male]").eq(0).check().should("be.checked", true);
    cy.get("button").contains("Register").click();
    cy.get("button").contains("Sign up").click();
    cy.url().should("eq", "http://localhost:3000/");
  });
});
