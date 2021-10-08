import React, { useState, useEffect, ChangeEvent, useRef } from "react";
import { NextPage, GetServerSideProps } from "next";
import { useCookie } from "next-cookie";
import { io, Socket } from "socket.io-client";
import axios from "axios";
import Link from "next/dist/client/link";

const Home: NextPage<{ cookie: string; chatRoom: string | string[] | any }> = (
  props,
) => {
  const chatRoom = props.chatRoom.chatRoom;

  const cookie = useCookie(props.cookie);
  const cookieName = cookie.get("name");
  const [reciever, setReciever] = useState<string | null>("");
  const [state, setState] = useState<{
    name?: string;
    message?: string;
    time?: string | number;
  }>({
    name: cookie.get("name"),
    message: "",
    time: "",
  });
  const [chat, setChat] = useState<string[]>([]);
  const [socketRef, setSocketRef] = useState<Socket | null>(null);

  //===========================
  // Updading chat and fetching users to add them to a list
  //===========================

  const updateChat = (sender: string, message: string): void => {
    setChat((prev: any) => [
      ...prev,
      { name: cookieName === sender ? cookieName : sender, message },
    ]);
  };

  useEffect(() => {
    const socketConnect: Socket = io("http://localhost:4000");
    socketConnect.on("message", ({ sender, message }: any) => {
      console.log("send");

      updateChat(sender, message);
    });

    socketConnect.emit("joined_chat_room", { user: cookieName });

    setSocketRef(socketConnect);
    return () => {
      socketRef && socketRef.disconnect();
    };
  }, []);

  //===========================
  // Submit and text change functions
  //===========================

  const onTextChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  const saveMessage = async () => {
    try {
      const res = await axios.post("http://localhost:4001/chat-room/messages", {
        user1: cookieName,
        user2: chatRoom[0],
        sender: cookieName,
        message: state.message,
      });
      console.log(res);
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  };

  const onMessageSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (state.message) {
      const { name, message, time } = state;
      await saveMessage();
      socketRef?.emit("message", {
        sender: name,
        reciever: chatRoom[0],
        message,
        time,
      });
      setState({ name, message: "" });
    }
  };

  const renderChat = () => {
    return chat.map(({ name, message, time }: any, index: number) => (
      <div className={name === chatRoom[0] ? "you" : "me"} key={index}>
        <h2 style={{ fontSize: "15px", color: "var(--main-black)" }}>
          {chatRoom[0] === name ? name : null}
        </h2>
        <div
          className="rendered_chat "
          style={{
            background:
              name === chatRoom[0] ? "var(--off-black)" : "var(--main-blue)",
          }}
        >
          <p>{message}</p>
          <p style={{ fontSize: "0.8rem" }}>{time}</p>
        </div>
      </div>
    ));
  };

  return (
    <div
      style={{ justifyContent: "center", height: "100vh" }}
      className="container chat_home"
    >
      <Link href={`http://localhost:3000/messages/${cookieName}`}>
        <a>Back to profile page</a>
      </Link>
      <h1>Your chat budy is {chatRoom[0]}</h1>
      <div className="container_chat">
        <h2>Welcome to my chat app</h2>
        {renderChat()}
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
