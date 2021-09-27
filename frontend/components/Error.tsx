import { AppProps } from "next/dist/shared/lib/router/router";
import React from "react";
import { useCookie } from "next-cookie";
import axios from "axios";

function Error({ cookie }: AppProps) {
  const [reciever, setReciever] = React.useState("");
  const cokie = useCookie(cookie);
  const cookieName = cookie.get("name");

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
    <div className="active_chats">
      <form onSubmit={sendInvite}>
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
      <h1>You dont have available chats</h1>
    </div>
  );
}

export default Error;
