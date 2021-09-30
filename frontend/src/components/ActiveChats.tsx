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
    </a>
  );
};
export default ActiveChats;
