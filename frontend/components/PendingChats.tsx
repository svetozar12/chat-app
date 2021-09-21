import { AppProps } from "next/dist/shared/lib/router/router";
import axios from "axios";
import React from "react";
import { useCookie } from "next-cookie";
function PendingChats({
  _id,
  inviter,
  status,
  localStatus,
  setLocalStatus,
  cookie,
}: AppProps) {
  const cokie = useCookie(cookie);
  const cookieName = cokie.get("name");
  const parentDiv = React.useRef<HTMLDivElement | null>(null);
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
    parentDiv.current;
    updateInviteStatus();
    setTimeout(() => {
      setLocalStatus("");
    }, 3000);
  };

  const updateInvites = async () => {
    try {
      const res = await axios.get(
        `http://localhost:4001/invites/${cookieName}`,
      );
      return true;
    } catch (error) {
      return false;
    }
  };

  React.useEffect(() => {
    if (localStatus) {
      console.log("render");
      console.log(localStatus);
      updateInvites();
    }
  }, [localStatus]);

  return (
    <div>
      {status === "recieved" && (
        <div ref={parentDiv} className="contacts">
          <h1>{inviter}</h1>
          <div className="invite_buttons">
            <button
              onClick={(e) => updateStatus("accepted")}
              className="accept"
            >
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
