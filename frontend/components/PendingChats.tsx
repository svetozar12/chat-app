import { AppProps } from "next/dist/shared/lib/router/router";
import axios from "axios";
import React from "react";

function PendingChats({
  _id,
  inviter,
  status,
  localStatus,
  setLocalStatus,
}: AppProps) {
  const updateInviteStatus = async () => {
    try {
      const res = await axios.put(`http://localhost:4001/invites`, {
        id: _id,
        status: localStatus, //will change it with state from buttons
      });
      console.log(res);
    } catch (error) {}
  };

  const updateStatus = (status: string) => {
    setLocalStatus(`${status}`);

    setTimeout(() => {
      setLocalStatus("");
    }, 3000);
  };

  React.useEffect(() => {
    if (localStatus) {
      console.log("render");
      console.log(localStatus);
      updateInviteStatus();
    }
  }, [localStatus]);

  return (
    <div>
      {status === "recieved" && (
        <div className="contacts">
          <h1>{inviter}</h1>
          <div className="invite_buttons">
            <button onClick={() => updateStatus("accepted")} className="accept">
              Aceept
            </button>
            <button
              onClick={() => updateStatus("declined")}
              className="decline"
            >
              Decline
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default PendingChats;
