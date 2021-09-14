import { NextPage } from "next";
import React, { useState, useEffect, ChangeEvent } from "react";
import { io, Socket } from "socket.io-client";
import { useCookie } from "next-cookie";
import { GetServerSideProps } from "next";
import { AppProps } from "next/dist/shared/lib/router/router";
import { useRouter } from "next/router";
import axios from "axios";
import { JsxElement } from "typescript";

interface IProps {
  name: string;
  message: string;
}

const Home: NextPage<{ cookie: string; chatRoom: Parameters }> = (props) => {
  const router = useRouter();
  const chatRoom = props.chatRoom.chatRoom;

  const cookie = useCookie(props.cookie);
  const [state, setState] = useState<IProps>({
    name: cookie.get("name"),
    message: "",
  });
  const [chat, setChat] = useState<string[]>([]);
  const [socketRef, setSocketRef] = useState<Socket | null>(null);

  const updateChat = (name: string, message: string) => {
    setChat((prev: any) => [...prev, { name, message }]);
  };

  useEffect(() => {
    const socketConnect: Socket = io("http://localhost:4000");
    socketConnect.on("message", ({ name, message }: any) => {
      updateChat(name, message);
      console.log("name", message);
    });
    setSocketRef(socketConnect);
    return () => {
      socketRef && socketRef.disconnect();
    };
  }, []);

  const onTextChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  const onMessageSubmit = (e: React.MouseEvent<HTMLButtonElement>): void => {
    e.preventDefault();
    const { name, message } = state;
    socketRef?.emit("message", { name, message });
    setState({ name, message: "" });
  };

  const checkForCookies = () => {
    if (!cookie.get("name")) {
      router.push("/");
    }
  };
  React.useEffect(() => {
    checkForCookies();
  }, []);

  const deleteUser = async () => {
    try {
      const res = await axios.delete(`http://localhost:4001/${state.name}`);
      router.push("/");
      cookie.remove("name");
      return true;
    } catch (error) {
      return false;
    }
  };

  const deleteCookies = () => {
    if (cookie.has("name")) {
      cookie.remove("name");
      router.push("/");
    }
  };

  const renderChat = (): JSX.Element | JSX.Element[] => {
    return chat.map(({ name, message }, index) => (
      <div className={name === chatRoom ? "me" : "you"} key={index}>
        <h2>{name}: </h2>
        <p>{message}</p>
      </div>
    ));
  };
  return (
    <div style={{ zIndex: "10", position: "relative" }} className="container">
      <h1>You're logged in as {state.name}</h1>
      <h2 className="log-out" onClick={deleteCookies}>
        Log out
      </h2>
      <h2 className="log-out" onClick={deleteUser}>
        Delete account
      </h2>
      <div className="container-chat">
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
  const { chatRoom } = context.query; //can be moved to ssp 144

  return {
    props: {
      cookie: context.req.headers.cookie || "",
      chatRoom: context.query,
    },
  };
};

export default Home;
