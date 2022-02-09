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

Cypress.Commands.add("delete_users", (users) => {
  users.forEach((element) => {
    cy.request("DELETE", `http://localhost:4002/users/${element}`);
  });
});
