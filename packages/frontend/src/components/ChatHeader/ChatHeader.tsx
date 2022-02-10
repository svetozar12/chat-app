import { Socket } from "socket.io-client";
import React from "react";
import AddGroupChat from "components/AddGroupChat/AddGroupChat";
import styled from "@emotion/styled";
function ChatHeader({
  cookieName,
  socketRef,
}: {
  cookieName: string;
  socketRef: Socket;
}) {
  const Header = styled.div`
    box-shadow: 0 0 5px;
    position: relative;
    width: 100%;
    z-index: 9999;
    padding: 1rem;
  `;
  return (
    <Header>
      <AddGroupChat socketRef={socketRef} cookieName={cookieName} />
    </Header>
  );
}

export default ChatHeader;
