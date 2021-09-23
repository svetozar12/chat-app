import React from "react";
import { AppProps } from "next/dist/shared/lib/router/router";

const ActiveChats = ({ inviter, status }: AppProps) => {
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
