import { getFirstChat } from "../../src/utils/getFirstChat";
let chatInstance: any;
const user = "jane.lane";
// @ts-ignore
(async () => {
  const res = await getFirstChat(user);
  chatInstance = res._id;
})();
describe("The Login Page", () => {
  before(() => {
    cy.request("POST", "http://localhost:4002/users/register", {
      username: user,
      password: user,
      email: `${user}@.com`,
      gender: "Male",
    });
  });
  beforeEach(() => {
    cy.visit("/login");
    cy.clearCookies();
  });
  it("successfully loads", () => {
    cy.url().should("include", `/login`);
  });
  it("should click Sign up for chatApp", () => {
    cy.get("a").contains("Sign up for chatApp").click();
    cy.url().should("include", `/register`);
  });
  it("should login", () => {
    cy.url().should("match", /login/);
    cy.get("input[name=username]").type(user);
    cy.get("input[name=password]").type(`${user}{enter}`);
    cy.url().should("include", `/${chatInstance}`);
  });
  it("shouldn't login", () => {
    cy.url().should("match", /login/);
    cy.get("input[name=username]").type("invalidUsername");
    cy.get("input[name=password]").type(`invalidPssword{enter}`);
    cy.url().should("include", `/login`);
  });
  after(() => {
    cy.request("DELETE", `http://localhost:4002/users/${user}`);
  });
});
