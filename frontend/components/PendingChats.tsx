import axios from "axios";
import React from "react";
import { useCookie } from "next-cookie";
import { AiFillCheckCircle, AiFillCloseCircle } from "react-icons/ai";
import { Socket } from "socket.io-client";
function PendingChats({
  _id,
  inviter,
  status,
  reciever,
  socketRef,
  setLocalStatus,
  data,
}: {
  _id: string;
  inviter: string;
  status: string;
  reciever: string;
  socketRef: Socket;
  setLocalStatus: any;
  data: string[];
}) {
  const emitFriendRequest = async (param: string) => {
    socketRef?.emit("friend_request");
  };

  const updateInviteStatus = async (param: string) => {
    try {
      setLocalStatus(param);
      const res = await axios.put(`http://localhost:4001/invites`, {
        id: _id,
        status: param,
      });
      emitFriendRequest(param);
      setLocalStatus("");
      return true;
    } catch (error) {
      return false;
    }
  };

  return (
    <div>
      {status === "recieved" && (
        <div className="contacts">
          <h1>{inviter}</h1>
          <div className="invite_buttons">
            <button
              onClick={() => updateInviteStatus("accepted")}
              className="accept"
            >
              <AiFillCheckCircle />
            </button>
            <button
              onClick={() => updateInviteStatus("declined")}
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
