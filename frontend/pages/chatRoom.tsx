import { NextPage, GetServerSideProps } from "next";
import React, { useState, useEffect, useRef, ChangeEvent } from "react";
import { io, Socket } from "socket.io-client";
import { useCookie } from "next-cookie";
import { AppProps } from "next/dist/shared/lib/router/router";
import { useRouter } from "next/router";

interface IProps {
  name: string;
  message: string;
}

const Home: NextPage = (props: AppProps) => {
  const router = useRouter();
  const cookie = useCookie(props.cookie);
  const [state, setState] = useState<IProps>({
    message: "",
    name: cookie.get("name"),
  });
  const [chat, setChat] = useState<string[]>([]);
  const [socketRef, setSocketRef] = useState<Socket | null>(null);
  useEffect((): any => {
    const socketConnect = io.connect("http://localhost:4000");
    socketConnect.on("message", ({ name, message }: any) => {
      setChat([...chat, { name, message }]);
    });
    setSocketRef(socketConnect);
    return () => socketRef && socketRef.disconnect(); //This trigers useEffect random error
  }, []);

  useEffect(() => {
    if (socketRef) {
      socketRef.on("message", ({ name, message }: any) => {
        setChat([...chat, { name, message }]);
      });
    }
  }, [chat]);

  const onTextChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  const onMessageSubmit = (e: React.MouseEvent<HTMLButtonElement>): void => {
    e.preventDefault();
    const { name, message } = state;
    socketRef?.emit("message", { name, message });
    setState({ name: name, message: "" });
  };

  const checkForCookies = () => {
    if (!cookie.has("name")) {
      console.log("no cookie");
      router.push("/");
    }
  };

  const deleteCookies = () => {
    if (cookie.has("name")) {
      cookie.remove("name");
      router.push("/");
    }
  };

  useEffect(() => {
    checkForCookies();
    // console.log(props.cookie);
  }, [props.cookie]); //dependecy arr doesnt work atm

  const renderChat = () => {
    return chat.map(
      ({ name, message }, index: number): JSX.Element => (
        <div className={cookie.get("name") ? "true" : "false"} key={index}>
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
      <h2 className="log-out">Delete account</h2>
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

  return {
    props: { cookie: context.req.headers.cookie || "" },
  };
};

export default Home;
