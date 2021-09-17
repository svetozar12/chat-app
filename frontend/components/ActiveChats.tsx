import React from "react";

function ActiveChats() {
  return (
    <main className="active_chats">
      <h1>Your chats</h1>
      <a href="http://localhost:3000/messages/invites/dar">
        <div>
          <div
            style={{
              padding: "2rem",
              margin: "2rem",
              background: "var(--off-blue)",
              color: "var(--main-white)",
            }}
          >
            <h1>username</h1>
            <p>Messages</p>
          </div>
        </div>
      </a>
    </main>
  );
}

export default ActiveChats;
