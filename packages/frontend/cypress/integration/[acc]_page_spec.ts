import { getFirstChat } from "../../src/utils/getFirstChat";
let chatInstance: any;
const user = "jane.lane";
const user2 = "piter.fiter";
const user3 = "greg.dreg";
const users: string[] = [user, user2, user3];
describe("The Chat Home Page", () => {
  before(() => {
    cy.authentication(users);
  });

  beforeEach(() => {
    cy.request({
      method: "GET",
      url: `http://localhost:4002/chat-room/?user_name=${user}`,
    }).as("chatId");

    cy.request({
      method: "POST",
      url: "http://localhost:4002/auth/login",
      body: { username: user, password: user },
    }).as("jwtTokens");

    cy.setCookie("name", user);
    cy.get("@chatId").then((response) => {
      chatInstance = response.body.contacts[0]._id;
      cy.setCookie("first_chat_id", chatInstance);
    });

    cy.get("@jwtTokens").then((interception) => {
      cy.setCookie("token", interception.body.Access_token);
      cy.setCookie("refresh_token", interception.body.Refresh_token);
    });
  });
  it("successfully loads", () => {
    cy.visit(`/${chatInstance}`);
    cy.url().should("include", `/${chatInstance}`);
  });
  it("should type and send a message", () => {
    cy.get("textarea").type("testingMessage{enter}");
    cy.get("span").should((span) => {
      expect(span).to.have.length(2);
      expect(span.first()).to.contain("testingMessage");
    });
  });
  it("should send invite for chat", () => {
    cy.get("input").type(`${user2}{enter}`);
    cy.request({
      method: "GET",
      url: `http://localhost:4002/invites/${user2}?status=recieved`,
    }).as("invite");
    cy.get("@invite").should((response) => {
      expect(response.body).to.have.property("invites");
      expect(response.status).to.eq(200);
    });
  });
  it("should accepte invite for chat", () => {
    cy.clearCookies();
    cy.visit("/");
    cy.request({
      method: "GET",
      url: `http://localhost:4002/chat-room/?user_name=${user}`,
    }).as("chatId");

    cy.request({
      method: "POST",
      url: "http://localhost:4002/auth/login",
      body: { username: user, password: user },
    }).as("jwtTokens");

    cy.setCookie("name", user);
    cy.get("@chatId").then((response) => {
      chatInstance = response.body.contacts[0]._id;
      cy.setCookie("first_chat_id", chatInstance);
    });

    cy.get("@jwtTokens").then((interception) => {
      cy.setCookie("token", interception.body.Access_token);
      cy.setCookie("refresh_token", interception.body.Refresh_token);
    });
    cy.visit(`/${chatInstance}`);
  });
  it(`should send message to ${user3}`, () => {
    cy.get("p").contains(user3).click();
    cy.get("textarea").type("anotherTestingMessage{enter}");
    cy.get("span").should((span) => {
      expect(span).to.have.length(2);
      expect(span.first()).to.contain("anotherTestingMessage");
    });
  });
  after(() => {
    cy.delete_users(users);
  });
});
