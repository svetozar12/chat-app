const user = "jane.lane";
describe("The Login Page", () => {
  before(() => {
    cy.request("POST", "http://localhost:4002/users/register", {
      username: user,
      password: user,
      email: `${user}@.com`,
      gender: "Male",
    });
  });
  it("successfully loads", () => {
    cy.visit("/login");
  });
  it("should click Already have an account", () => {
    cy.get("a").contains("Sign up for chatApp").click();
  });
  it("should login", () => {
    cy.visit("/login");
    cy.get("input[name=username]").type(user);
    cy.get("input[name=password]").type(`${user}{enter}`);
  });
  after(() => {
    cy.request("DELETE", `http://localhost:4002/users/${user}`);
  });
});
