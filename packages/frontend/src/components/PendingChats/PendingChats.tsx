import axios from "axios";
import React from "react";
import { AiFillCheckCircle, AiFillCloseCircle } from "react-icons/ai";
import { Socket } from "socket.io-client";
import { requestUrl } from "../../utils/hostUrl_requestUrl";
import { Iinvites } from "../../pages/[acc]";
import { FaUserCircle } from "react-icons/fa";
import styled from "@emotion/styled";
import { css } from "@emotion/css";

interface IPendingChats extends Iinvites {
  _id: string;
  inviter: string;
  status: string;
  reciever: string;
  socketRef: Socket;
  setLocalStatus: React.Dispatch<React.SetStateAction<string>>;
}

const Contacts = styled.div`
  border-top: 2px solid rgba(0, 0, 0, 0.3);
  background: var(--main-white);
  width: 95%;
  margin: 0.5rem;
  display: flex;
  justify-content: space-between;
`;

const Accept = styled.button`
  color: var(--main-black);
  outline: none;
  border: none;
  font-size: 3.01rem;
  background: transparent;
  transition: 0.2s;
  &:hover {
    color: var(--main-green);
    transition: 0.2s;
  }
`;

const Decline = styled.button`
  color: var(--main-black);
  outline: none;
  border: none;
  font-size: 3.01rem;
  background: transparent;
  transition: 0.2s;
  &:hover {
    color: var(--main-red);
    transition: 0.2s;
  }
`;

function PendingChats({ _id, inviter, reciever, status, socketRef, setLocalStatus }: IPendingChats) {
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
        <Contacts className="contacts">
          <div className="user_info flex">
            {image ? <img src={image} alt="user_avatar" /> : <FaUserCircle />}
            <h1 className="flex">{inviter}</h1>
          </div>
          <div className="invite_buttons">
            <Accept
              onClick={() => {
                createChatRoom();
              }}
              className="accept flex"
            >
              <AiFillCheckCircle
                className={css`
                  width: 2rem;
                  height: 2rem;
                `}
              />
            </Accept>
            <Decline onClick={() => updateInviteStatus("declined")} className="decline flex">
              <AiFillCloseCircle
                className={css`
                  width: 2rem;
                  height: 2rem;
                `}
              />
            </Decline>
          </div>
        </Contacts>
      )}
    </div>
  );
}

export default PendingChats;
