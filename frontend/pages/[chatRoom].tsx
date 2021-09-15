import React, { useState, useEffect, ChangeEvent } from "react";
import { NextPage, GetServerSideProps } from "next";
import { useCookie } from "next-cookie";
import { useRouter } from "next/router";
// external npms
import { io, Socket } from "socket.io-client";
import axios from "axios";
interface IProps {
  name: string;
  message: string;
  time: string | number;
}

const Home: NextPage<{ cookie: string; chatRoom: string | any }> = (props) => {
  const router = useRouter();
  const chatRoom = props.chatRoom.chatRoom;

  const cookie = useCookie(props.cookie);
  const [state, setState] = useState<IProps>({
    name: cookie.get("name"),
    message: "",
    time: "",
  });
  const [chat, setChat] = useState<string[]>([]);
  const [socketRef, setSocketRef] = useState<Socket | null>(null);

  const deleteCookies = () => {
    if (cookie.get("name")) {
      cookie.remove("name");
      router.push("/");
    }
  };

  const deleteUser = async () => {
    try {
      const res = await axios.delete(`http://localhost:4001/${state.name}`);
      deleteCookies();
      return true;
    } catch (error) {
      return false;
    }
  };

  const validateUser = async () => {
    try {
      const res = await axios.get(
        `http://localhost:4001/users/${cookie.get("name")}`,
      );
      return true;
    } catch (error) {
      deleteCookies();
      return false;
    }
  };

  const updateChat = (name: string, message: string, time: number | string) => {
    setChat((prev: any) => [...prev, { name, message, time }]);
  };

  useEffect(() => {
    validateUser();
    const socketConnect: Socket = io("http://localhost:4000");
    socketConnect.on("message", ({ name, message, time }: any) => {
      updateChat(name, message, time);
    });

    socketConnect.emit("joinRoom", "room1");
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
    const { name, message, time } = state;
    socketRef?.emit("message", { name, message, time });
    setState({ name, message: "", time: "" });
  };

  const renderChat = () => {
    return chat.map(({ name, message, time }: any, index) => (
      <div className={name === chatRoom ? "me" : "you"} key={index}>
        <h2 style={{ fontSize: "15px", color: "var(--main-black)" }}>{name}</h2>
        <div
          style={{
            background:
              name === chatRoom ? "var(--main-blue)" : "var(--off-black) ",
            borderRadius: "10%",
            width: "35%",
            overflow: "auto",
            wordWrap: "break-word",
          }}
        >
          <p>{message}</p>
          <p style={{ fontSize: "0.8rem" }}>{time}</p>
        </div>
      </div>
    ));
  };
  return (
    <div className="container chat_home">
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

  if (!cookie.get("name")) {
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

// https://avatars.dicebear.com/api/initials/:seed.svg
