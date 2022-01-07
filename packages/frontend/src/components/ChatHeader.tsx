import { Socket } from "socket.io-client";
import React from "react";
import AddGroupChat from "./AddGroupChat";
function ChatHeader({
  sender,
  cookieName,
  socketRef,
}: {
  sender: string;
  cookieName: string;
  socketRef: Socket;
}) {
  return (
    <div className="chat_header" style={{ padding: "1rem" }}>
      <AddGroupChat socketRef={socketRef} cookieName={cookieName} />
    </div>
  );
}

export default ChatHeader;
