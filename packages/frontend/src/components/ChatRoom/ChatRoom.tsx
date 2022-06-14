import { MdSend } from "react-icons/md";
import { NextPage } from "next";
import { io, Socket } from "socket.io-client";
import { useRouter } from "next/router";
import { css } from "@emotion/css";
import React, { useState, useEffect } from "react";
import styled from "@emotion/styled";
// utils
import timeStamp from "../../utils/timeStamp";
import { constants } from "../../constants";
// components
import RenderChat from "./RenderChat";
import ChatHeader from "../ChatHeader";
// hooks
import { useDispatch, useSelector } from "react-redux";
import { useCookie } from "next-cookie";
// services
import api_helper from "../../services/graphql/api_helper";
import { InitialStateMessage } from "../../services/redux/reducer/messageReducer/state";
import { IInitialSet } from "../../services/redux/reducer/setReducer/state";
import ChatRoomForm from "./ChatRoomForm/ChatRoomForm";

interface IHome {
  chatId: any;
}

export interface IchatInstance {
  _id: string;
  sender: string;
  message: string;
  createdAt: string;
}

const ChatRoom: NextPage<IHome> = ({ chatId }) => {
  const route = useRouter();
  const messageState = useSelector((state: { messageReducer: InitialStateMessage }) => state.messageReducer);
  const statess = useSelector((state: { setReducer: IInitialSet }) => state.setReducer);
  const inputTextArea = React.useRef<any>(null);
  const cookie = useCookie();
  const user_id = cookie.get("id") as string;
  const token = cookie.get("token") as string;
  const dispatch = useDispatch();
  const [socketRef, setSocketRef] = useState<Socket | null>(null);
  const containerRef = React.useRef<null | HTMLDivElement>(null);

  const getRecentMessages = async () => {
    try {
      const res = await api_helper.message.getAll({ user_id, chat_id: chatId, token, query: { page_size: 10, page_number: 1 } });

      res.forEach((element) => {
        dispatch({ type: "MESSAGES", payload: element });
      });

      return true;
    } catch (error) {
      return false;
    }
  };

  useEffect(() => {
    inputTextArea.current.focus();
    if (!cookie.get("token") && !cookie.get("refresh_token")) dispatch({ type: "SIGN_OUT" });
    const socketConnect: Socket = io("http://localhost:4000");

    console.log("ws-connect");
    socketConnect.on("message", ({ messages }) => {
      const [message] = messages;

      dispatch({ type: "MESSAGES", payload: message });
    });
    socketConnect.emit("joined_chat_room", { chatInstance: chatId });
    setSocketRef(socketConnect);
    return () => {
      socketRef && socketRef.disconnect();
    };
  }, []);

  useEffect(() => {
    dispatch({ type: "SET_IS_MATCH", payload: false });
    if (location.href === constants.HOST_URL + "/" + chatId) dispatch({ type: "SET_IS_MATCH", payload: true });
    dispatch({ type: "RESET_MESSAGES" });
    socketRef && socketRef.emit("joined_chat_room", { chatInstance: chatId });
    getRecentMessages();
  }, [route.asPath]);

  const scrollHandler = async (e: React.UIEvent<HTMLElement>) => {
    try {
      if (e.currentTarget.scrollTop === 0) {
        dispatch({
          type: "INCREMENT_PAGE_NUMBER",
          payload: statess.pageNumber,
        });
        const res = await api_helper.message.getAll({
          user_id,
          chat_id: chatId,
          token,
          query: { page_size: 10, page_number: statess.pageNumber },
        });
        const data = res.reversedArr;

        data.forEach((element) => {
          dispatch({ type: "PAGGINATION_MESSAGES", payload: element });
        });
      }
      return true;
    } catch (error) {
      return false;
    }
  };

  const scrollToBottom = () => {
    const parent = containerRef.current;
    parent?.scrollTo(0, parent.scrollHeight);
  };

  React.useEffect(() => {
    scrollToBottom();
  }, [messageState.messages]);

  return (
    <div
      className={css`
        position: relative;
        z-index: 10;
        justifycontent: center;
        alignitems: center;
        width: 100%;
        height: 100vh;
        padding: 0;
      container`}
    >
      {socketRef && statess.toggleCreateGroup && <ChatHeader socketRef={socketRef} />}

      <div
        ref={containerRef}
        className={css`
          flex-direction: column;
          width: 100%;
          height: 90%;
          padding: 1rem;
          overflow: auto;
          background-color: var(--main-white);
          box-shadow: 0px 0px 20px var(--off-white);
        `}
        onScroll={scrollHandler}
      >
        {messageState.messages.map((item, index) => {
          const { sender, message, createdAt } = item;
          const time_stamp = timeStamp(createdAt);

          return (
            <li style={{ listStyle: "none" }} key={index}>
              <RenderChat key={index} chatId={chatId} id={item._id} sender={sender} time_stamp={time_stamp} message={message} />
            </li>
          );
        })}
      </div>
      <ChatRoomForm chatId={chatId} socketRef={socketRef} inputTextArea={inputTextArea} />
    </div>
  );
};

export default ChatRoom;
