import { NextPage } from "next";
import Image from "next/image";
import React, {
  useState,
  useEffect,
  useRef,
  ChangeEvent,
  ReactElement,
} from "react";
import { io } from "socket.io-client";

interface IProps {
  name: string;
  message: string;
}

const Home: NextPage = () => {
  const [state, setState] = useState<IProps>({
    message: "",
    name: "",
  });

  const [chat, setChat] = useState<IProps[]>([]);
  const socketRef = io("http://localhost:4000");

  socketRef.on("connection", () => {
    console.log("we are connected");
  });
  socketRef.on("message", ({ name, message }: IProps) => {
    setChat([...chat, { name, message }]);
  });

  const onTextChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  const onMessageSubmit = (e: React.MouseEvent<HTMLButtonElement>): void => {
    e.preventDefault();
    const { name, message } = state;
    socketRef.emit("message", { name, message });
    setState({ name: name, message: "" });
  };

  const renderChat = () => {
    return chat.map(
      ({ name, message }, index: number): JSX.Element => (
        <div key={index}>
          <h3>{name}: </h3>
          <p>{message}</p>
        </div>
      ),
    );
  };
  return (
    <div className="container">
      <h1>Chat messages</h1>
      <div className="container-chat">
        <h2>Welcome to my chat app</h2>
        {renderChat()}
      </div>

      <form>
        <div>
          <input
            type="text"
            name="name"
            onChange={(e) => onTextChange(e)}
            value={state.name}
            placeholder="Username ..."
          />
          <input
            type="text"
            name="message"
            onChange={(e) => onTextChange(e)}
            value={state.message}
            placeholder="Message ..."
          />
        </div>
        <button onClick={onMessageSubmit}>
          <strong>Send message</strong>
        </button>
      </form>
    </div>
  );
};

export default Home;
