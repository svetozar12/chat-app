import React from "react";
import axios from "axios";
import { useCookie } from "next-cookie";
import { GetServerSideProps, NextPage } from "next";

const ActiveChats = (cookie: string) => {
  const cokie = useCookie(cookie);
  const sender = cokie.get("name");

  const [reciever, setReciever] = React.useState("");
  const sendInvite = async () => {
    try {
      console.log(reciever);
      const rep = axios.post(
        `http://localhost:4001/invites/${sender}/${reciever}`,
      );
      return true;
    } catch {
      return false;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    sendInvite();
  };
  return (
    <main onSubmit={sendInvite} className="active_chats">
      <h1>Your chats</h1>
      <input
        onChange={(e) => setReciever(e.target.value)}
        value={reciever}
        type="text"
        placeholder="Search user"
      />
      <button type="submit" onClick={handleSubmit}>
        Search
      </button>
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
};

export default ActiveChats;
