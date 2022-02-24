import styled from "@emotion/styled";
import React from "react";
interface IRenderChat {
  sender: string;
  time_stamp: string | number;
  message: string;
  chatId: string;
  cookie: string;
}

const RenderChat = ({ sender, time_stamp, message, cookie }: IRenderChat) => {
  const name = cookie;
  const Header2 = styled.h2`
    font-size: 15px;
    color: var(--main-black);
  `;

  const Rendered_chat = styled.div`
    border-radius: 4px;
    max-width: 80%;
    padding: 0.5rem 1rem;
    overflow: hidden;
    word-wrap: break-word;
    background: ${name === sender ? "var(--main-blue)" : "var(--me-chat-buble)"};
  `;

  const Message_bubble = styled.div`word-wrap: break-word,
            text-align: center,
  `;
  return (
    <div className={`${name === sender ? "me" : "you"} flex`}>
      <Header2>{name === sender ? null : sender}</Header2>
      <Rendered_chat>
        <Message_bubble>
          <span>{message}</span>
        </Message_bubble>
        <span
          style={{
            fontSize: "0.65rem",
          }}
        >
          {time_stamp}
        </span>
      </Rendered_chat>
    </div>
  );
};

export default RenderChat;
