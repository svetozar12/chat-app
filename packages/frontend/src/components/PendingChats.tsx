import axios from "axios";
import React from "react";
import { AiFillCheckCircle, AiFillCloseCircle } from "react-icons/ai";
import { Socket } from "socket.io-client";
import { requestUrl } from "../utils/hostUrl_requestUrl";
import { Iinvites } from "../pages/[acc]";
import { FaUserCircle } from "react-icons/fa";
interface IPendingChats extends Iinvites {
  _id: string;
  inviter: string;
  status: string;
  reciever: string;
  socketRef: Socket;
  setLocalStatus: React.Dispatch<React.SetStateAction<string>>;
}

function PendingChats({
  _id,
  inviter,
  reciever,
  status,
  socketRef,
  setLocalStatus,
}: IPendingChats) {
  const [image, setImage] = React.useState<string>("");
  const emitFriendRequest = async () => {
    socketRef?.emit("friend_request");
  };

  const getUserImage = async (name: string) => {
    try {
      const res = await axios.get(`${requestUrl}/users/${name}`);
      const userAvatar = res.data.user.userAvatar;
      if (!userAvatar) {
        setImage("");
        return false;
      }
      const requestString = `${requestUrl}/${userAvatar}`;
      setImage(requestString);
      return true;
    } catch (error) {
      return false;
    }
  };

  const updateInviteStatus = async (param: string) => {
    try {
      setLocalStatus(param);
      await axios.put(`${requestUrl}/invites`, {
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
        user1: inviter,
        user2: reciever,
      });
      emitFriendRequest();
      setLocalStatus("");
    } catch (error) {
      return false;
    }
  };

  React.useEffect(() => {
    getUserImage(inviter);
  }, []);

  return (
    <div style={{ width: "100%" }}>
      {status === "recieved" && (
        <div className="contacts">
          <div className="user_info flex">
            {image ? <img src={image} alt="user_avatar" /> : <FaUserCircle />}
            <h1 className="flex">{inviter}</h1>
          </div>
          <div className="invite_buttons">
            <button
              onClick={() => {
                createChatRoom();
              }}
              className="accept flex"
            >
              <AiFillCheckCircle />
            </button>
            <button
              onClick={() => updateInviteStatus("declined")}
              className="decline flex"
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
