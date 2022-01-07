import React, { useState, useEffect, ChangeEvent } from "react";
import { NextPage } from "next";
import { io, Socket } from "socket.io-client";
import { useDispatch, useSelector } from "react-redux";
import { InitialState2 } from "../redux/state";
import { MdSend } from "react-icons/md";
import axios from "axios";
import RenderChat from "../components/RenderChat";
import timeStamp from "../utils/timeStamp";
import { requestUrl } from "../utils/hostUrl_requestUrl";
import { useRouter } from "next/router";

interface IHome {
  cookie: any;
  chatId: any;
}

interface IPropsState {
  name?: string;
  message?: string;
  time?: string | number;
}

interface IchatInstance {
  sender: string;
  message: string;
  createdAt: string;
}

const ChatRoom: NextPage<IHome> = ({ cookie, chatId }) => {
  const route = useRouter();
  const states2 = useSelector(
    (state: { homePageReducer: InitialState2 }) => state.homePageReducer,
  );
  const cookieName = cookie.get("name");
  const dispatch = useDispatch();
  const [chat, setChat] = useState<IchatInstance[]>([]);
  const [socketRef, setSocketRef] = useState<Socket | null>(null);
  const [state, setState] = useState<IPropsState>({
    name: cookie.get("name"),
    message: "",
    time: "",
  });

  const updateChat = (param: IchatInstance[]) => {
    setChat((prev) => [...prev, ...param]);
  };

  const getRecentMessages = async () => {
    try {
      const res = await axios.get(
        `${requestUrl}/messages/${chatId}?page_number=1&page_size=10`,
      );
      const data = res.data.reversedArr;
      console.log(data);

      updateChat(data);
      return true;
    } catch (error) {
      return false;
    }
  };

  useEffect(() => {
    setChat([]);
    getRecentMessages();
  }, [route.asPath]);

  useEffect(() => {
    if (!cookie.get("token") && !cookie.get("refresh_token"))
      dispatch({ type: "SIGN_OUT" });
    const socketConnect: Socket = io("http://localhost:4000");
    socketConnect.on("message", ({ messages }) => {
      dispatch({
        type: "MESSAGE_SEND",
        payload: { sender: cookieName, message: state.message },
      });
      updateChat(messages);
    });
    socketConnect.emit("joined_chat_room", { user: cookieName });
    setSocketRef(socketConnect);
    return () => {
      socketRef && socketRef.disconnect();
    };
  }, []);

  const onTextChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  const saveMessage = async () => {
    try {
      const res = await axios.post(`${requestUrl}/messages/${chatId}`, {
        sender: cookieName,
        message: state.message,
      });

      dispatch({
        type: "MESSAGE_SEND",
        payload: { sender: cookieName, message: state.message },
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
          payload: states2.pageNumber,
        });
        const res = await axios.get(
          `${requestUrl}/messages/${chatId}?page_number=${states2.pageNumber}&page_size=10`,
        );
        const data = res.data.reversedArr;

        setChat((prev) => [...data, ...prev]);
      }
      return true;
    } catch (error) {
      return false;
    }
  };

  const onMessageSubmit = async (
    e: React.FormEvent<HTMLFormElement> | React.MouseEvent<SVGElement>,
  ) => {
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

  return (
    <div
      style={{
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "100vh",
        padding: "0",
      }}
      className="container  chat_home"
    >
      <div onScroll={scrollHandler} className="container_chat">
        {chat.map((item, index) => {
          const { sender, message, createdAt } = item;
          const time_stamp = timeStamp(createdAt);
          return (
            <li style={{ listStyle: "none" }} key={index}>
              <RenderChat
                key={index}
                chatId={chatId}
                cookie={cookie.get("name")}
                sender={sender}
                time_stamp={time_stamp}
                message={message}
              />
            </li>
          );
        })}
      </div>

      <form
        onSubmit={onMessageSubmit}
        className="message_form"
        style={{ width: "100%" }}
      >
        <div className="message_input_container">
          <input
            type="text"
            name="message"
            onChange={(e) => onTextChange(e)}
            value={state.message}
            placeholder="Your Message "
          />
          <MdSend onClick={onMessageSubmit} />
        </div>
      </form>
    </div>
  );
};

export default ChatRoom;
