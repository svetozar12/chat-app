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

interface IState {
  message: string;
  name: string;
}

const Home: NextPage = () => {
  const [state, setState] = useState<IState>({
    message: "",
    name: "",
  });
  const [chat, setChat] = useState<string[] | []>([]);
  const socketRef = useRef<React.MutableRefObject>(null);
  console.log(socketRef);

  useEffect(() => {
    socketRef.current = io.connect("http://localhost:4000");
    socketRef.current.on("message", ({ name, message }: any) => {
      setChat([...chat, { name, message }]);
    });
    return () => socketRef.current.disconnect();
  }, [chat]);

  const onTextChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  const onMessageSubmit = (e: React.MouseEvent<HTMLButtonElement>): void => {
    e.preventDefault();
    const { name, message } = state;
    socketRef.current.emit("message", { name, message });
    setState({ message: "", name: name });
  };

  const renderChat = () => {
    return chat.map(
      ({ name, message }: any, index): ReactElement => (
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
