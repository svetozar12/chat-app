import { Socket } from "socket.io-client";
import React from "react";
import AddGroupChat from "../AddGroupChat";
import { css } from "@emotion/css";
function ChatHeader({ cookieName, socketRef }: { cookieName: string; socketRef: Socket }) {
  return (
    <div
      title="chat_header"
      className={css`
        box-shadow: 0 0 5px;
        position: absolute;
        width: 100%;
        height: 8rem;
        background: var(--main-white);
        z-index: 9999;
        padding: 1rem;
      `}
    >
      <AddGroupChat socketRef={socketRef} cookieName={cookieName} />
    </div>
  );
}

export default ChatHeader;
