import React, { MouseEventHandler } from "react";
import axios from "axios";
import { useCookie } from "next-cookie";
import { AppProps } from "next/dist/shared/lib/router/router";

const ActiveChats = ({ cookie, _id, inviter, status, items }: AppProps) => {
  const cokie = useCookie(cookie);
  const cookieName = cookie.get("name");

  const [reciever, setReciever] = React.useState("");

  return (
    <div>
      {status === "accepted" && (
        <a
          style={{
            margin: "1rem",
            width: "100%",
            textAlign: "center",
          }}
          href="http://localhost:3000/messages/invites/dar"
        >
          <div>
            <div className="accepted_invite">
              <h1>{inviter}</h1>
            </div>
          </div>
        </a>
      )}
    </div>
  );
};
export default ActiveChats;
