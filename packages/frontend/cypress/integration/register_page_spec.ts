const user = "jane.lane";
const user2 = "jane.kane";

// @ts-ignore
describe("The Register Page", () => {
  beforeEach(() => {
    cy.visit("/register");
    cy.clearCookies();
  });
  it("successfully loads", () => {
    cy.url().should("include", `/register`);
  });
  it("should click Already have an account", () => {
    cy.get("a").contains("Already have an account?").click();
    cy.url().should("include", `/`);
  });
  it("should register", () => {
    cy.url().should("match", /register/);
    cy.get("input[name=username]").type(user);
    cy.get("input[name=password]").type(`${user}`);
    cy.get("input[name=email]").type(`${user}@.com`);
    cy.get("label").contains("Female").click();
    cy.url().should("include", `/register`);
    cy.get("button").contains("Register").click();
  });
  it("should quick login", () => {
    cy.url().should("match", /register/);
    cy.get("input[name=username]").type(user2);
    cy.get("input[name=password]").type(`${user2}`);
    cy.get("input[name=email]").type(`${user2}@.com`);
    cy.get("label").contains("Male").click();
    cy.get("button").contains("Register").click();
    cy.get("div").contains("Click me to Quick login").click();
  });
  it("shouldn't register", () => {
    cy.url().should("match", /register/);
    cy.get("input[name=username]").type("i");
    cy.get("input[name=password]").type(`d`);
    cy.get("input[name=email]").type("d");
    cy.get("label").contains("Male").click();
    cy.get("button").contains("Register").click();
  });
  after(() => {
    cy.request({
      method: "DELETE",
      url: `http://localhost:4002/users/${user}`,
      failOnStatusCode: false,
    });
    cy.request({
      method: "DELETE",
      url: `http://localhost:4002/users/${user2}`,
      failOnStatusCode: false,
    });
  });
});
