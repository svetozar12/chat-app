import React from "react";

interface IRenderChat {
  sender: string;
  time_stamp: string | number;
  message: string;
  cookie: string;
}

const RenderChat = ({ sender, time_stamp, message, cookie }: IRenderChat) => {
  const name = cookie;
  return (
    <div className={name === sender ? "me" : "you"}>
      <h2 style={{ fontSize: "15px", color: "var(--main-black)" }}>
        {name === sender ? null : sender}
      </h2>
      <div
        className="rendered_chat"
        style={{
          background:
            name === sender ? "var(--main-blue)" : "var(--me-chat-buble)",
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
