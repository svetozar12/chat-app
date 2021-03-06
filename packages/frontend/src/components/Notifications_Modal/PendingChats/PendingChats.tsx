import axios from "axios";
import React from "react";
import { AiFillCheckCircle, AiFillCloseCircle } from "react-icons/ai";
import { Socket } from "socket.io-client";
import { requestUrl } from "../../../utils/hostUrl_requestUrl";
import { Iinvites } from "../../../pages/[acc]";
import { css, cx } from "@emotion/css";
import Single_avatar from "../../Avatar/Single_avatar";
interface IPendingChats extends Iinvites {
  _id: string;
  inviter: string;
  status: string;
  reciever: string;
  socketRef: Socket;
}

const ButtonSharedStyle = `
  display: flex;
  justify-content: center;
  align-items: center;
  &:hover {
    outline: none;
    border: none;
    font-size: 1.9rem;
    background: transparent;
    transition: 0.2s;
  }`;

function PendingChats({ _id, inviter, reciever, status, socketRef }: IPendingChats) {
  const emitFriendRequest = async () => {
    socketRef?.emit("friend_request");
  };

  const updateInviteStatus = async (param: string) => {
    try {
      await axios.put(`${requestUrl}/invites`, {
        id: _id,
        status: param,
      });
      emitFriendRequest();

      return true;
    } catch (error) {
      return false;
    }
  };

  const createChatRoom = async () => {
    try {
      await axios.put(`${requestUrl}/chat-room`, {
        id: _id,
        user1: inviter,
        user2: reciever,
      });
      emitFriendRequest();
    } catch (error) {
      return false;
    }
  };

  return (
    <div style={{ width: "100%" }}>
      {status === "recieved" && (
        <div
          className={cx(
            "contacts",
            css`
              border-top: 2px solid rgba(0, 0, 0, 0.3);
              background: var(--main-white);
              width: 98.5%;
              height: 20vh;
              margin: 0.5rem;
              display: flex;
              justify-content: space-between;
            `,
          )}
        >
          <div className="user_info flex">
            <Single_avatar inviter={inviter} cookieName="" width="3rem" height="3rem" />
            <h1 className="flex">{inviter}</h1>
          </div>
          <div className="invite_buttons">
            <button
              onClick={() => {
                createChatRoom();
              }}
              className={cx(
                css`
                  ${ButtonSharedStyle}
                `,
                css`
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
                `,
              )}
            >
              <AiFillCheckCircle
                className={css`
                  width: 3rem;
                  height: 3rem;
                `}
              />
            </button>
            <button
              onClick={() => updateInviteStatus("declined")}
              className={cx(
                css`
                  ${ButtonSharedStyle}
                `,
                css`
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
                `,
              )}
            >
              <AiFillCloseCircle
                className={css`
                  width: 3rem;
                  height: 3rem;
                `}
              />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default PendingChats;
