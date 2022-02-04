describe("The Home Page", () => {
  it("successfully loads", () => {
    cy.visit("/");
  });
  it("should redirect us to /register", () => {
    cy.get("a").contains("Create an account !").click();
  });
  it("should redirect us to /login", () => {
    cy.visit("/");
    cy.get("a").contains("Already have a acount ?").click();
  });
});
