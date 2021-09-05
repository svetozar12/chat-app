import { NextPage } from "next";
import React, { useState, useEffect, useRef, HTMLProps } from "react";
import { io } from "socket.io-client";

const Home: NextPage = () => {
  interface IUser {
    message: string;
    name: string;
  }

  const [state, setState] = useState<IUser>({ message: "", name: "" });
  const [chat, setChat] = useState([]);

  const socketRef = useRef<HTMLProp>();

  useEffect(() => {
    socketRef.current = io.connect("http://localhost:4000");
    socketRef.current.on("message", ({ name, message }) => {
      setChat([...chat, { name, message }]);
    });
    return () => socketRef.current.disconnect();
  }, [chat]);

  const onTextChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  const onMessageSubmit = (e) => {
    e.preventDefault();
    const { name, message } = state;
    socketRef.current.emit("message", { name, message });
    setState({ message: "", name: name });
  };

  const renderChat = () => {
    return chat.map(({ name, message }, index) => (
      <div key={index}>
        <h3>{name}</h3>
        <p>{message}</p>
      </div>
    ));
  };

  return (
    <div>
      <form onSubmit={onMessageSubmit}>
        <h1>Messenger</h1>
        <input
          type="text"
          name="name"
          onChange={(e) => onTextChange(e)}
          value={state.name}
        />
        <input
          type="text"
          name="message"
          onChange={(e) => onTextChange(e)}
          value={state.message}
        />
        <button>Send message</button>
      </form>
      <h1>Chat messages</h1>
      {renderChat()}
    </div>
  );
};

export default Home;
