import { Socket } from "socket.io-client";
import React from "react";
import AddGroupChat from "../AddGroupChat/AddGroupChat";
import { css } from "@emotion/css";
function ChatHeader({
  cookieName,
  socketRef,
}: {
  cookieName: string;
  socketRef: Socket;
}) {
  return (
    <div
      className={css`
        box-shadow: 0 0 5px;
        position: relative;
        width: 100%;
        z-index: 9999;
        padding: 1rem;
      `}
    >
      <AddGroupChat socketRef={socketRef} cookieName={cookieName} />
    </div>
  );
}

export default ChatHeader;
