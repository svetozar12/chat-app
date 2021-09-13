import axios from "axios";
import { NextPage, GetServerSideProps } from "next";
import React, {
  useState,
  useEffect,
  useRef,
  ChangeEvent,
  CSSProperties,
} from "react";
import { io, Socket } from "socket.io-client";
import { useCookie } from "next-cookie";
import { useRouter } from "next/router";

const Home: NextPage = (props) => {
  interface IProps {
    name: string;
    message: string;
  }

  const router = useRouter();
  const cookie = useCookie(props.cookie);
  const [state, setState] = useState<IProps>({
    message: "",
    name: cookie.get("name"),
  });

  const [chat, setChat] = useState<string[]>([]);

  const [socketRef, setSocketRef] = useState<Socket | null>(null);

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

  const onTextChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  const onMessageSubmit = (e: React.MouseEvent<HTMLButtonElement>): void => {
    e.preventDefault();
    const { name, message } = state;
    socketRef?.emit("message", { name, message });
    setState({ name: name, message: "" });
  };

  const deleteCookies = () => {
    if (cookie.has("name")) {
      cookie.remove("name");
      router.push("/");
    }
  };

  useEffect(() => {
    const socketConnect = io.connect("http://localhost:4000");
    socketConnect.on("message", ({ name, message }: IProps): void => {
      setChat([...chat, { name, message }]);
    });
    setSocketRef(socketConnect);
    return () => socketRef && socketRef.disconnect();
  }, []);

  useEffect(() => {
    if (socketRef) {
      socketRef.on("message", ({ name, message }: IProps) => {
        setChat([...chat, { name, message }]);
      });
    }
  }, [chat]);

  const renderChat = () => {
    return chat.map(
      ({ name, message }, index: number): JSX.Element => (
        <div
          className={
            cookie.get("name") === cookie.get("name") ? "true" : "false"
          }
          key={index}
        >
          <h2>{name}: </h2>
          <p>{message}</p>
        </div>
      ),
    );
  };
  return (
    <div style={{ position: "relative", zIndex: "10" }} className="container">
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
        destination: "/login",
        permanent: false,
      },
    };
  }

  return {
    props: { cookie: context.req.headers.cookie || "" },
  };
};

export default Home;
