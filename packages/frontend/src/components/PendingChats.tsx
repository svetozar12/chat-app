import axios from "axios";
import React from "react";
import { AiFillCheckCircle, AiFillCloseCircle } from "react-icons/ai";
import { Socket } from "socket.io-client";

interface IPendingChats {
  _id: string;
  inviter: string;
  status: string;
  reciever: string;
  socketRef: Socket;
  setLocalStatus: any;
}

function PendingChats({
  _id,
  inviter,
  status,
  reciever,
  socketRef,
  setLocalStatus,
}: IPendingChats) {
  const emitFriendRequest = async () => {
    socketRef?.emit("friend_request");
  };

  const updateInviteStatus = async (param: string) => {
    try {
      setLocalStatus(param);
      const res = await axios.put(`http://localhost:4001/invites`, {
        id: _id,
        status: param,
      });
      emitFriendRequest();
      setLocalStatus("");

      return true;
    } catch (error) {
      return false;
    }
  };

  const createChatRoom = async () => {
    try {
      setLocalStatus("accepted");
      const res = await axios.put(`http://localhost:4001/chat-room`, {
        id: _id,
        user1: inviter,
        user2: reciever,
      });
      const id = res.data.Message._id;
      emitFriendRequest();
      setLocalStatus("");
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
              onClick={() => {
                createChatRoom();
              }}
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