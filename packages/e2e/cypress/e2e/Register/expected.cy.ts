import { sdk } from "../../support/commands";

describe("example to-do app", () => {
  const fields = [
    {
      name: "input[name=username]",
      value: "svetozar",
    },
    {
      name: "input[name=password]",
      value: "svetozar",
    },
    {
      name: "input[name=email]",
      value: "svetozar@test.com",
    },
  ];
  beforeEach(() => {
    cy.visit("/register");
    cy.url().should("eq", "http://localhost:3000/register");
  });
  after(async () => {
    const { loginUser } = await sdk.LoginUser({
      password: "svetozar",
      username: "svetozar",
    });
    if (loginUser.__typename === "Error") throw new Error(loginUser.message);
    const { userId, AccessToken } = loginUser || {};
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
