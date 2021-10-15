import React from "react";

interface IRenderChat {
  user1: string;
  user2: string;
  time_stamp: string | number;
  message: string;
  cookie: string;
}

const RenderChat = ({
  user1,
  user2,
  time_stamp,
  message,
  cookie,
}: IRenderChat) => {
  const sender = user1;
  const reciever = user2;
  const name = cookie;

  return (
    <div className={name === reciever ? "you" : "me"}>
      <h2 style={{ fontSize: "15px", color: "var(--main-black)" }}>
        {reciever === sender ? sender : null}
      </h2>
      <div
        className="rendered_chat"
        style={{
          background:
            name === reciever ? "var(--me-chat-buble)" : "var(--main-blue)",
        }}
      >
        <div
          style={{
            wordWrap: "break-word",
            textAlign: "center",
          }}
        >
          <span>{message}</span>
        </div>
        <span
          style={{
            fontSize: "0.65rem",
          }}
        >
          {time_stamp}
        </span>
      </div>
    </div>
  );
};

export default RenderChat;
