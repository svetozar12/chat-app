import React, { MouseEventHandler } from "react";
import axios from "axios";
import { useCookie } from "next-cookie";
import { AppProps } from "next/dist/shared/lib/router/router";

const ActiveChats = ({ cookie, _id, inviter, status }: AppProps) => {
  const cokie = useCookie(cookie);
  const cookieName = cookie.get("name");
  const sender = cokie.get("name");

  const [reciever, setReciever] = React.useState("");
  const sendInvite = async () => {
    try {
      const res = axios.post(`http://localhost:4001/invites`, {
        reciever,
        inviter: cookieName,
      });
      return true;
    } catch (error) {
      console.log("sponge", error);

      return false;
    }
  };

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    sendInvite();
  };
  return (
    <main onSubmit={sendInvite} className="active_chats">
      <h1>Your chats</h1>
      <form>
        <input
          onChange={(e) => setReciever(e.target.value)}
          value={reciever}
          type="text"
          placeholder="Search user"
        />
        <button type="submit" onClick={handleSubmit}>
          Search
        </button>
      </form>

      <div>
        {status === "accepted" && (
          <a
            style={{
              margin: "1rem",
              width: "100%",
              textAlign: "center",
            }}
            href="http://localhost:3000/messages/invites/dar"
          >
            <div>
              <div className="accepted_invite">
                <h1>{inviter}</h1>
              </div>
            </div>
          </a>
        )}
      </div>
    </main>
  );
};

export default ActiveChats;
