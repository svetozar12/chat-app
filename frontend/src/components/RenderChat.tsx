import React from "react";

const RenderChat = ({ user1, user2, time_stamp, message, cookie }) => {
  const sender = user1;
  const reciever = user2;
  const name = cookie;
  // console.log(users);

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
