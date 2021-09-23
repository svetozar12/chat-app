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
      console.log("PUT :", res);

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
      console.log("GET :", res);

      return true;
    } catch (error) {
      return false;
    }
  };

  // const updateStatus = (status: string) => {
  //   setLocalStatus(`${status}`);
  //   console.log(status);
  //   if (localStatus) {
  //     console.log("preFetch");
  //     updateInviteStatus();
  //   }
  //   setTimeout(() => {
  //     setLocalStatus("");
  //   }, 3000);
  // };

  React.useEffect(() => {
    if (localStatus) {
      console.log("fetch");
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
