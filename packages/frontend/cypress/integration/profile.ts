// import { getFirstChat } from "../../src/utils/getFirstChat";
// let chatInstance: any;
// const user = "jane.lane";
// // @ts-ignore

// describe("The Profile Page", () => {
//   before(() => {
//     cy.request("POST", "http://localhost:4002/users/register", {
//       username: user,
//       password: user,
//       email: `${user}@.com`,
//       gender: "Male",
//     });
//     cy.request({
//       method: "GET",
//       url: `http://localhost:4002/chat-room/?user_name=${user}`,
//     }).as("chatId");
//     cy.get("@chatId").then((response) => {
//       // @ts-ignore
//       chatInstance = response.body.contacts[0]._id;
//       cy.setCookie("first_chat_id", chatInstance, {
//         sameSite: "strict",
//         path: "/",
//       });
//     });
//   });
//   beforeEach(() => {
//     cy.visit("/");
//     cy.clearCookies();
//   });
//   it("successfully loads", () => {
//     cy.url().should("include", `/`);
//   });
//   it("should click Sign up for chatApp", () => {
//     cy.get("a").contains("Sign up for chatApp").click();
//     cy.url().should("include", `/register`);
//   });
//   it("should login", () => {
//     cy.url().should("include", `/`);
//     cy.get("input[name=username]").type(user);
//     cy.get("input[name=password]").type(user);
//     cy.get("button").click();
//     cy.wait(10000);
//     cy.url().should("include", `/${chatInstance}`);
//   });
//   it("should login with rememberMe checked", () => {
//     cy.url().should("include", `/`);
//     cy.get("input[name=username]").type(user);
//     cy.get("[type=checkbox]").check({ force: true }).should("be.checked");
//     cy.get("input[name=password]").type(`${user}{enter}`);
//     cy.wait(10000);
//     cy.url().should("include", `/${chatInstance}`);
//   });
//   it("shouldn't login", () => {
//     cy.url().should("include", `/`);
//     cy.get("input[name=username]").type("invalidUsername");
//     cy.get("input[name=password]").type(`invalidPssword{enter}`);
//     cy.url().should("include", `/`);
//   });
//   after(() => {
//     cy.request("DELETE", `http://localhost:4002/users/${user}`);
//   });
// });
