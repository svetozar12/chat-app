import React, { useState, useEffect, ChangeEvent, useRef } from "react";
import { NextPage, GetServerSideProps } from "next";
import { useCookie } from "next-cookie";
import { io, Socket } from "socket.io-client";
import { IChatProps, IHomeProps } from "../../interfaces/global";
import Link from "next/dist/client/link";
import axios from "axios";

const Home: NextPage<IHomeProps> = (props) => {
  const chatRoom = props.chatRoom.chatRoom;
  const cookie = useCookie(props.cookie);
  const cookieName = cookie.get("name");

  const [reciever, setReciever] = useState<string | null>("");
  const [state, setState] = useState<IChatProps>({
    name: cookie.get("name"),
    message: "",
    time: "",
  });
  const [savedChat, setSavedChat] = useState<string[]>([]);
  const [chat, setChat] = useState<string[]>([]);
  const [socketRef, setSocketRef] = useState<Socket | null>(null);

  //===========================
  // Updading chat and fetching users to add them to a list
  //===========================

  const updateChat = (name: string, message: string) => {
    setChat((prev: any) => [...prev, { name, message }]);
  };

  useEffect(() => {
    const socketConnect: Socket = io("http://localhost:4000");
    socketConnect.on("message", ({ name, message }: any) => {
      updateChat(name, message);
    });
    socketConnect?.on("send_message", ({ me, you }) => {
      setReciever(you);
      return reciever;
    });

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

  const onMessageSubmit = (e: React.MouseEvent<HTMLButtonElement>): void => {
    e.preventDefault();
    const { name, message, time } = state;
    socketRef?.emit("message", { name, message, time });
    setState({ name });
  };

  const renderChat = () => {
    return chat.map(({ name, message, time }: any, index: number) => (
      <div className={name === chatRoom[0] ? "me" : "you"} key={index}>
        <h2 style={{ fontSize: "15px", color: "var(--main-black)" }}>{name}</h2>
        <div
          className="rendered_chat "
          style={{
            background:
              name === chatRoom[0] ? "var(--main-blue)" : "var(--off-black) ",
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
  const cookieRemove = cookie.remove("name");
  if (!cookieName) {
    cookieRemove;
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  if (cookieName) {
    try {
      const res = await axios.get(`http://localhost:4001/users/${cookieName}`);
    } catch (error) {
      cookieRemove;
      return {
        redirect: {
          destination: "/",
          permanent: false,
        },
      };
    }
  }

  return {
    props: {
      cookie: context.req.headers.cookie || "",
      chatRoom: context.query,
    },
  };
};

export default Home;
