Cypress.Commands.add("authentication", (users) => {
  users.forEach((element: string) => {
    cy.request({
      method: "POST",
      url: "http://localhost:4002/users/register",
      body: {
        username: element,
        password: element,
        email: `${element}@.com`,
        gender: "Male",
      },
    });
  });
  cy.request({
    method: "POST",
    url: "http://localhost:4002/invites",
    body: { reciever: users[0], inviter: users[2] },
  }).as("invite");
  cy.get("@invite").then((response) => {
    cy.request({
      method: "PUT",
      url: "http://localhost:4002/invites",
      // @ts-ignore
      body: { id: response.body.message._id, status: "accepted" },
    });
    cy.request({
      method: "PUT",
      url: "http://localhost:4002/chat-room",
      body: {
        // @ts-ignore
        id: response.body.message._id,
        user1: users[0],
        user2: users[2],
      },
    });
  });
});

Cypress.Commands.add("set_tokens", (user) => {
  let chatInstance: any;
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

Cypress.Commands.add("delete_users", (users) => {
  users.forEach((element) => {
    cy.request("DELETE", `http://localhost:4002/users/${element}`);
  });
});
