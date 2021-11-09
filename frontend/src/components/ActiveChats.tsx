import React from "react";
import { useRouter } from "next/router";
import { Socket } from "socket.io-client";

interface IActiveChats {
  _id: string;
  user1: string;
  user2: string;
  cookieName: string;
  socketRef: Socket;
}

const ActiveChats = ({
  _id,
  user1,
  user2,
  cookieName,
  socketRef,
}: IActiveChats) => {
  const router = useRouter();

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
      chat_id: cookieName,
    });
    router.push(`t/${_id}`);
  };

  return (
    <div onClick={joinChat} className="contacts_container">
      <div style={{ display: "flex", alignItems: "center" }}>
        <div>LOGO</div>
        <div className="contacts_info">
          <h2>
            {(width && width >= 432 && user2 === cookieName && user1) ||
              (user1 === cookieName && user2)}
          </h2>
          {width && width >= 432 && <h5>Last message...</h5>}
        </div>
      </div>
    </div>
  );
};
export default ActiveChats;
