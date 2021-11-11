import React, { useState, useEffect, ChangeEvent, useRef } from "react";
import { NextPage, GetServerSideProps } from "next";
import { useCookie } from "next-cookie";
import { io, Socket } from "socket.io-client";
import { useDispatch, useSelector } from "react-redux";
import { InitialState } from "../redux/state";
import { InitialState2 } from "../redux/state";
import { InitialStateMessage } from "../redux/state";

import axios from "axios";
import Link from "next/dist/client/link";
import RenderChat from "../components/RenderChat";

interface IHome {
  cookie: string;
  chatRoom: string | string[] | any;
}

interface IPropsState {
  name?: string;
  message?: string;
  time?: string | number;
}

const Home: NextPage<IHome> = (props) => {
  const states = useSelector(
    (state: { authReducer: InitialState }) => state.authReducer,
  );

  const states2 = useSelector(
    (state: { homePageReducer: InitialState2 }) => state.homePageReducer,
  );

  const statesMessages = useSelector(
    (state: { messageReducer: InitialStateMessage }) => state.messageReducer,
  );

  console.log(states);

  const chatRoom = props.chatRoom.chatRoom;
  const cookieName = states.cookie;
  const dispatch = useDispatch();
  const [chat, setChat] = useState<string[]>([]);
  const [socketRef, setSocketRef] = useState<Socket | null>(null);
  const [state, setState] = useState<IPropsState>({
    name: cookieName,
    message: "",
    time: "",
  });

  const updateChat = (param: any) => {
    setChat((prev) => [...prev, ...param]);
  };

  const getRecentMessages = async () => {
    try {
      const res = await axios.get(
        `http://localhost:4001/messages/${chatRoom[1]}?page_number=1&page_size=10`,
      );
      const data = res.data.reversedArr;
      updateChat(data);
      return true;
    } catch (error) {
      return false;
    }
  };

  useEffect(() => {
    getRecentMessages();
    const socketConnect: Socket = io("http://localhost:4000");
    socketConnect.on("message", ({ messages }: any) => {
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
      const res = await axios.post(
        `http://localhost:4001/messages/${chatRoom[1]}`,
        {
          sender: cookieName,
          message: state.message,
        },
      );

      dispatch({
        type: "MESSAGE_SEND",
        payload: { sender: cookieName, message: state.message },
      });

      return true;
    } catch (error) {
      return false;
    }
  };

  const scrollHandler = async (e: any) => {
    try {
      if (e.currentTarget.scrollTop === 0) {
        dispatch({
          type: "INCREMENT_PAGE_NUMBER",
          payload: states2.pageNumber,
        });
        const res = await axios.get(
          `http://localhost:4001/messages/${chatRoom[1]}?page_number=${states2.pageNumber}&page_size=10`,
        );
        const data = res.data.reversedArr;
        setChat((prev) => [...data, ...prev]);
      }
      return true;
    } catch (error) {
      return false;
    }
  };

  const onMessageSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (state.message) {
      const { name, message, time } = state;

      await saveMessage();
      socketRef?.emit("message", {
        chatInstance: chatRoom[1],
        sender: cookieName,
        message,
        time,
      });
      setState({ name, message: "" });
    }
  };

  return (
    <div
      style={{ justifyContent: "center", height: "100vh" }}
      className="container chat_home"
    >
      <Link href={`http://localhost:3000/${cookieName}`}>
        <a>
          <h3>Back to profile page</h3>
        </a>
      </Link>
      <div onScroll={scrollHandler} className="container_chat">
        <h2>Welcome to my chat app</h2>
        {chat.map((item, index) => {
          const { sender, message, createdAt } = item;
          let date = new Date(createdAt);
          let currentHours: string | number = date.getHours().toString();
          let currentMinutes: string | number = date.getMinutes().toString();
          const time_stamp = `${currentHours.padStart(
            2,
            "0",
          )}:${currentMinutes.padStart(2, "0")}`;
          return (
            <li style={{ listStyle: "none" }} key={index}>
              <RenderChat
                key={index}
                cookie={cookieName}
                sender={sender}
                time_stamp={time_stamp}
                message={message}
              />
            </li>
          );
        })}
      </div>

      <form>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <input
            style={{ width: "100%", textAlign: "center" }}
            type="text"
            name="message"
            onChange={(e) => onTextChange(e)}
            value={state.message}
            placeholder="Your Message "
          />
        </div>
        <button onClick={onMessageSubmit}>
          <strong>Send message</strong>
        </button>
      </form>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const cookie = useCookie(context);
  const cookieName = cookie.get("name");

  if (!cookieName) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: {
      cookie: context.req.headers.cookie || "",
      chatRoom: context.query,
    },
  };
};

export default Home;

// {
//   item.messages.map((subItem, index) => {
//     const sender = item.sender;
//     return (
//       <RenderChat
//         key={index}
//         cookie={cookieName}
//         sender={sender}
//         {...subItem}
//       />
//     );
//   });
// }
