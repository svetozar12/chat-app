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
  const [count, setCount] = React.useState(0);
  console.log(user1, user2);

  React.useEffect(() => {
    setWidth(window.innerWidth);
    window.addEventListener("resize", () => {
      setWidth(window.innerWidth);
    });
    return window.removeEventListener("resize", () => {
      setWidth(window.innerWidth);
    });
  }, []);

  console.log(
    members.map((element) => {
      console.log(element);
    }),
  );

  const joinChat = () => {
    socketRef?.emit("join_chat", {
      chat_id: cookieName,
    });
    router.push(`t/${_id}`);
  };

  return (
    <div onClick={joinChat} className="contacts_container">
      <div style={{ display: "flex", alignItems: "center" }}>
        <FaUserCircle className="user-logo" />
        <div className="contacts_info">
          <h2 style={{ display: "flex", flexDirection: "row" }}>
            {members.length > 2
              ? members.map((element, index) => {
                  if (index === 3) return;
                  return (
                    <p>
                      {element}
                      {element[members.length - 1] === element[index]
                        ? ""
                        : ","}
                    </p>
                  );
                })
              : (width && width >= 432 && user2 === cookieName && user1) ||
                (user1 === cookieName && user2)}
          </h2>
          {width && width >= 605 && <h5>Last message...</h5>}
        </div>
      </div>
    </div>
  );
};
export default ActiveChats;
