import axios from "axios";
import React from "react";
import { AiFillCheckCircle, AiFillCloseCircle } from "react-icons/ai";
import { Socket } from "socket.io-client";
import { requestUrl } from "../utils/hostUrl_requestUrl";
import { Iinvites } from "../pages/[acc]";
interface IPendingChats extends Iinvites {
  _id: string;
  inviter: string;
  status: string;
  reciever: string;
  users: string[];
  socketRef: Socket;
  setLocalStatus: React.Dispatch<React.SetStateAction<string>>;
}

function PendingChats({
  _id,
  inviter,
  status,
  reciever,
  users,
  socketRef,
  setLocalStatus,
}: IPendingChats) {
  const emitFriendRequest = async () => {
    socketRef?.emit("friend_request");
  };

  const updateInviteStatus = async (param: string) => {
    try {
      setLocalStatus(param);
      const res = await axios.put(`${requestUrl}/invites`, {
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
      await axios.put(`${requestUrl}/chat-room`, {
        id: _id,
        userData: users,
      });
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
