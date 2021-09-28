import { AppProps } from "next/dist/shared/lib/router/router";
import axios from "axios";
import React from "react";
import { useCookie } from "next-cookie";
import { AiFillCheckCircle, AiFillCloseCircle } from "react-icons/ai";
function PendingChats({
  _id,
  inviter,
  status,
  reciever,
  setLocalStatus,
  cookie,
  socketRef,
}: AppProps) {
  const cokie = useCookie(cookie);

  const updateInviteStatus = async (word: string) => {
    try {
      setLocalStatus(word);
      const res = await axios.put(`http://localhost:4001/invites`, {
        id: _id,
        status: word,
      });
      setLocalStatus("");
      return true;
    } catch (error) {
      return false;
    }
  };

  const emitFriendRequest = (param: string) => {
    socketRef?.emit("friend_request", {
      reciever,
      inviter,
      status: param,
    });
  };

  return (
    <div>
      {status === "recieved" && (
        <div className="contacts">
          <h1>{inviter}</h1>
          <div className="invite_buttons">
            <button
              onClick={() => {
                updateInviteStatus("accepted");
                emitFriendRequest("accepted");
              }}
              className="accept"
            >
              <AiFillCheckCircle />
            </button>
            <button
              onClick={() => {
                updateInviteStatus("declined");
                emitFriendRequest("declined");
              }}
              className="decline"
            >
              <AiFillCloseCircle />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default PendingChats;
