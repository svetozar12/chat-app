import React, { useState, useEffect } from "react";
import { MdSend } from "react-icons/md";
import { NextPage } from "next";
import { io, Socket } from "socket.io-client";
import { useDispatch, useSelector } from "react-redux";
import { InitialStateMessage } from "../../redux/reducer/messageReducer/state";
import { IInitialSet } from "../../redux/reducer/setReducer/state";
import axios from "axios";
import RenderChat from "./RenderChat";
import ChatHeader from "../ChatHeader";
import timeStamp from "../../utils/timeStamp";
import { hostUrl, requestUrl } from "../../utils/hostUrl_requestUrl";
import { useRouter } from "next/router";
import { css } from "@emotion/css";
import styled from "@emotion/styled";

const Message_form = styled.form`
  width: 100%;
  background: var(--main-white);
  height: 10%;
`;

interface IHome {
  cookie: any;
  chatId: any;
}

interface IPropsState {
  name?: string;
  message?: string;
  time?: string | number;
}

export interface IchatInstance {
  _id: string;
  sender: string;
  message: string;
  createdAt: string;
}

const ChatRoom: NextPage<IHome> = ({ cookie, chatId }) => {
  const route = useRouter();
  const messageState = useSelector((state: { messageReducer: InitialStateMessage }) => state.messageReducer);
  const statess = useSelector((state: { setReducer: IInitialSet }) => state.setReducer);
  const inputTextArea = React.useRef<any>(null);
  const cookieName = cookie.get("name");
  const dispatch = useDispatch();
  const [socketRef, setSocketRef] = useState<Socket | null>(null);
  const containerRef = React.useRef<null | HTMLDivElement>(null);
  const [state, setState] = useState<IPropsState>({
    name: cookie.get("name"),
    message: "",
    time: "",
  });

  const getRecentMessages = async () => {
    try {
      const res = await axios.get(`${requestUrl}/messages/${chatId}?page_number=1&page_size=10`);
      const data = res.data.reversedArr;
      data.forEach((element) => {
        dispatch({ type: "MESSAGES", payload: element });
      });

      return true;
    } catch (error) {
      return false;
    }
  };

  useEffect(() => {
    dispatch({ type: "SET_IS_MATCH", payload: false });
    if (location.href === hostUrl + "/" + chatId) dispatch({ type: "SET_IS_MATCH", payload: true });
    dispatch({ type: "RESET_MESSAGES" });
    getRecentMessages();
  }, [route.asPath]);

  useEffect(() => {
    inputTextArea.current.focus();
    if (!cookie.get("token") && !cookie.get("refresh_token")) dispatch({ type: "SIGN_OUT" });
    const socketConnect: Socket = io("http://localhost:4000");
    socketConnect.on("message", ({ messages }) => {
      const [message] = messages;
      dispatch({ type: "MESSAGES", payload: message });
    });
    socketConnect.emit("joined_chat_room", { user: cookieName });
    setSocketRef(socketConnect);
    return () => {
      socketRef && socketRef.disconnect();
    };
  }, []);

  const saveMessage = async () => {
    try {
      await axios.post(`${requestUrl}/messages/${chatId}`, {
        sender: cookieName,
        message: state.message,
      });

      return true;
    } catch (error) {
      return false;
    }
  };

  const scrollHandler = async (e: React.UIEvent<HTMLElement>) => {
    try {
      if (e.currentTarget.scrollTop === 0) {
        dispatch({
          type: "INCREMENT_PAGE_NUMBER",
          payload: statess.pageNumber,
        });
        const res = await axios.get(`${requestUrl}/messages/${chatId}?page_number=${statess.pageNumber}&page_size=10`);
        const data = res.data.reversedArr;

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

  const onMessageSubmit = async (e: React.FormEvent<HTMLFormElement> | React.MouseEvent<SVGElement>) => {
    e.preventDefault();
    if (state.message) {
      const { name, message, time } = state;

      await saveMessage();
      socketRef?.emit("message", {
        chatInstance: chatId,
        sender: cookieName,
        message,
        time,
      });
      setState({ name, message: "" });
    }
  };

  const handleKeyPress = (e: any) => {
    const target = e.target as HTMLTextAreaElement;
    inputTextArea.current.style.height = "15px";
    inputTextArea.current.style.height = `${target.scrollHeight}px`;
    inputTextArea.current.style.height = `${Math.min(e.target.scrollHeight, 60)}px`;

    setState({ ...state, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e: any) => {
    if (e.key === "Enter") {
      onMessageSubmit(e);
    }
  };
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
      {socketRef && statess.toggleCreateGroup && <ChatHeader socketRef={socketRef} cookieName={cookie.get("name")} />}

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
              <RenderChat
                key={index}
                chatId={chatId}
                cookie={cookie.get("name")}
                id={item._id}
                sender={sender}
                time_stamp={time_stamp}
                message={message}
              />
            </li>
          );
        })}
      </div>

      <Message_form onSubmit={onMessageSubmit} className="flex">
        <div
          className={css`
            cursor: text;
            position: relative;
            z-index: 1000;
            flex-direction: row;
            justify-content: space-between;
            background: #d9d9d9;
            border-radius: 25px;
            width: 70%;
            margin: 0.5rem 0;
            padding: 0.5rem 2rem;
            overflow-wrap: break-word;
            display: flex;
            justify-content: center;
            align-items: center;
          flex`}
          onClick={() => inputTextArea.current.focus()}
        >
          <textarea
            className={css`
              border: none;
              resize: none;
              padding: 0;
              wordbreak: break-all;
              width: 90%;
              background: transparent;
              height: 0.9375rem;
              &:focus {
                outline: none;
              }
            `}
            ref={inputTextArea}
            name="message"
            onKeyDown={(e) => handleSubmit(e)}
            onChange={(e) => handleKeyPress(e)}
            placeholder="Your Message "
            value={state.message}
          />
          <div
            className={css`
              display:flex;
              justify-content: center;
              align-items: center;
              cursor: pointer;
              padding: 0.3rem 0 0.3rem 0.5rem;
              border: 1px transperant;
              border-radius: 50px;
              &:hover {
                background: rgba(0, 0, 0, 0.1);
                border-radius: 50px;
              }
            flex`}
          >
            <MdSend
              className={css`
                cursor: pointer;
                width: 1.5rem;
                height: 1.5rem;
                margin-right: 0.3rem;
                padding: 0.1rem;
              `}
              type="submit"
              onClick={onMessageSubmit}
            />
          </div>
        </div>
      </Message_form>
    </div>
  );
};

export default ChatRoom;
