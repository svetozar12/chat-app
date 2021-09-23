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

  const updateInviteStatus = async (word: string) => {
    try {
      setLocalStatus(word);
      const res = await axios.put(`http://localhost:4001/invites`, {
        id: _id,
        status: word, //will change it with state from buttons
      });
      setLocalStatus("");

      return true;
    } catch (error) {
      return false;
    }
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
      updateInvites();
    }
  }, [localStatus]);

  return (
    <div>
      {status === "recieved" && (
        <div className="contacts">
          <h1>{inviter}</h1>
          <div className="invite_buttons">
            <button
              onClick={() => updateInviteStatus("accepted")}
              className="accept"
            >
              Aceept
            </button>
            <button
              onClick={() => updateInviteStatus("declined")}
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
