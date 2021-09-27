import React from "react";
import { useCookie } from "next-cookie";
import axios from "axios";
const ActiveChats = ({
  reciever,
  inviter,
  status,
  cookie,
  get,
}: {
  reciever: string;
  inviter: string;
  status: string;
  cookie: string;
  get: () => void;
}) => {
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
  const sendInvite = async () => {
    try {
      const res = await axios.post(`http://localhost:4001/invites`, {
        inviter: reciever,
        reciever: inviter,
        status: "accepted",
      });
      return true;
    } catch (error) {
      return false;
    }
  };

  React.useEffect(() => {
    sendInvite();
    get();
  }, []);

  return (
    <a
      className="contacts_container"
      href={`http://localhost:3000/messages/${cokie.get("name")}/chat`}
    >
      <div style={{ display: "flex", alignItems: "center" }}>
        <div>logo </div>
        <h1>{width && width >= 432 && inviter}</h1>
      </div>
      {width && width >= 432 && <p>Last message...</p>}
    </a>
  );
};
export default ActiveChats;
