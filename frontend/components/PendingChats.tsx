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
  setLocalStatus,
  cookie,
  socketRef,
}: {
  _id: string;
  inviter: string;
  status: string;
  reciever: string;
  setLocalStatus: any;
  cookie: string;
  socketRef: Socket;
}) {
  const cokie = useCookie(cookie);
  console.log(_id);

  const updateInviteStatus = async (param: string) => {
    try {
      setLocalStatus(param);
      console.log(_id, "ID");

      const res = await axios.put(`http://localhost:4001/invites`, {
        _id,
        status: param,
      });
      setLocalStatus("");
      return true;
    } catch (error) {
      return false;
    }
  };

  const emitFriendRequest = async (param: string) => {
    socketRef?.emit("friend_request", {
      _id,
      reciever,
      inviter,
      status: param,
    });
    await updateInviteStatus(param);
  };

  return (
    <div>
      {status === "recieved" && (
        <div className="contacts">
          <h1>{inviter}</h1>
          <div className="invite_buttons">
            <button
              onClick={() => emitFriendRequest("accepted")}
              className="accept"
            >
              <AiFillCheckCircle />
            </button>
            <button
              onClick={() => emitFriendRequest("declined")}
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
