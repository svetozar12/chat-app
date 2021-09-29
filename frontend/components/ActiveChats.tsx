import React from "react";
import { useCookie } from "next-cookie";
import axios from "axios";
const ActiveChats = ({
  reciever,
  inviter,
  cookie,
}: {
  reciever: string;
  inviter: string;
  status: string;
  cookie: string;
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

  return (
    <a
      className="contacts_container"
      href={`http://localhost:3000/messages/${cokie.get("name")}/chat`}
    >
      <div style={{ display: "flex", alignItems: "center" }}>
        <div>logo </div>
        <h1>
          {width && width >= 432 && inviter === cokie.get("name") && reciever}
          {width && width >= 432 && reciever === cokie.get("name") && inviter}
        </h1>
      </div>
      {width && width >= 432 && <p>Last message...</p>}
    </a>
  );
};
export default ActiveChats;
