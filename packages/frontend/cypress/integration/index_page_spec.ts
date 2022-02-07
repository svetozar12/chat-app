describe("The Home Page", () => {
  before(() => {
    cy.clearCookies();
  });
  beforeEach(() => {
    cy.visit("/");
  });
  it("successfully loads", () => {
    cy.url().should("match", /[/]/);
  });
  it("should redirect us to /register", () => {
    cy.get("a").contains("Create an account !").click();
    cy.url().should("include", `/register`);
  });
  it("should redirect us to /login", () => {
    cy.get("a").contains("Already have a acount ?").click();
    cy.url().should("include", `/login`);
  });
});
