import React from "react";
import { useRouter } from "next/router";
import { Socket } from "socket.io-client";
import { FaUserCircle } from "react-icons/fa";
interface IActiveChats {
  _id: string;
  members: string[];
  cookieName: string;
  socketRef: Socket;
}

const ActiveChats = ({ _id, members, cookieName, socketRef }: IActiveChats) => {
  const router = useRouter();
  const [width, setWidth] = React.useState<number | null>(null);
  const [user1, user2] = [members[0], members[1]];

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
    router.push(`${_id}`);
  };

  return (
    <div onClick={joinChat} className="contacts_container">
      <div style={{ display: "flex", alignItems: "center" }}>
        {members.length > 2 ? (
          <div className="group_logo_container">
            <FaUserCircle className="user-logo logo" />
            <FaUserCircle className="user-logo logo overlay" />
          </div>
        ) : (
          <FaUserCircle className="user-logo" />
        )}
        <div className="contacts_info">
          <h2
            className="invite-userName"
            style={{
              display: "flex",
            }}
          >
            <span>
              {members.length > 2
                ? members.map((element, index) => {
                    if (index === 3) return;
                    return (
                      <>
                        {element}
                        {element[members.length - 1] === element[index]
                          ? " ..."
                          : ","}
                      </>
                    );
                  })
                : (members.length === 1 && <p>{user1}</p>) ||
                  (user2 === cookieName && <p>{user1}</p>) ||
                  (user1 === cookieName && <p>{user2}</p>)}
            </span>
          </h2>
          <h5>Last message...</h5>
        </div>
      </div>
    </div>
  );
};
export default ActiveChats;
