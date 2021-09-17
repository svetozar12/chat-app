import React from "react";

function Invites() {
  return (
    <div className="container">
      <h1>Your Invites</h1>
      <ul className="invite_list">
        <main>
          <li>Invite from: Someone</li>
          <div className="accept_decline">
            <button type="button" className="accept_button">
              Accept
            </button>
            <button type="button" className="ignore_button">
              Ignore
            </button>
          </div>
        </main>
      </ul>
    </div>
  );
}

export default Invites;
