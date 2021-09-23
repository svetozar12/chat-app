import React from "react";
import { useCookie } from "next-cookie";
import axios from "axios";
import { AppProps } from "next/dist/shared/lib/router/router";

function FindFriends({ cookie }: AppProps) {
  const [reciever, setReciever] = React.useState("");
  const cokie = useCookie(cookie);
  const cookieName = cokie.get("name");

  const sendInvite = async () => {
    try {
      const res = axios.post(`http://localhost:4001/invites`, {
        reciever,
        inviter: cookieName,
      });
      return true;
    } catch (error) {
      return false;
    }
  };

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setReciever("");
    sendInvite();
  };

  return (
    <form onSubmit={sendInvite}>
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
    </form>
  );
}

export default FindFriends;
