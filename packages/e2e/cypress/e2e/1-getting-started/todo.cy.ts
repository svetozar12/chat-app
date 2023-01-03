describe("example to-do app", () => {
  // beforeEach(() => {
  //   cy.visit("/");
  // });

  it("open chat", () => {
    cy.visit("/");
    cy.url().should("eq", "http://localhost:3000/");
  });
});
