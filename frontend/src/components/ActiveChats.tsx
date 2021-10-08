import React from "react";
import { useCookie } from "next-cookie";
import { useRouter } from "next/router";
import { Socket } from "socket.io-client";
import axios from "axios";
const ActiveChats = ({
  reciever,
  inviter,
  cookie,
  socketRef,
}: {
  reciever: string;
  inviter: string;
  cookie: string;
  socketRef: Socket;
}) => {
  const router = useRouter();
  const cokie = useCookie(cookie);

  const [width, setWidth] = React.useState<number | null>(null);
  React.useEffect(() => {
    setWidth(window.innerWidth);
    window.addEventListener("resize", () => {
      setWidth(window.innerWidth);
    });
    return window.removeEventListener("resize", () => {
      setWidth(window.innerWidth);
    });
  }, []);

  const joinChat = () => {
    socketRef?.emit("join_chat", {
      chat_id: cokie.get("name"),
    });
    router.push(`${cokie.get("name") === inviter ? reciever : inviter}/chat`);
  };

  return (
    <div onClick={joinChat} className="contacts_container">
      <div style={{ display: "flex", alignItems: "center" }}>
        <div>LOGO</div>
        <div className="contacts_info">
          <h2>
            {(width &&
              width >= 432 &&
              inviter === cokie.get("name") &&
              reciever) ||
              (reciever === cokie.get("name") && inviter)}
          </h2>
          {width && width >= 432 && <h5>Last message...</h5>}
        </div>
      </div>
    </div>
  );
};
export default ActiveChats;
