import React from "react";
import { useCookie } from "next-cookie";
import axios from "axios";
import { Socket } from "socket.io-client";

function FindFriends({
  cookie,
  socketRef,
}: {
  cookie: string;
  socketRef: Socket;
}) {
  const [reciever, setReciever] = React.useState("");
  const cokie = useCookie(cookie);
  const cookieName = cokie.get("name");

  const sendInvite = async () => {
    try {
      const res = await axios.post(`http://localhost:4001/invites`, {
        reciever,
        inviter: cookieName,
        status: "recieved",
      });
      return true;
    } catch (error) {
      return false;
    }
  };

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (reciever) {
      sendInvite();
      socketRef?.emit("send_friend_request", {
        inviter: cookieName,
        reciever,
      });
      console.log(reciever);

      setReciever("");
    }
  };

  return (
    <form className="friendsInput">
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
