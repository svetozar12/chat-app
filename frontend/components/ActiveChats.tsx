import React, { MouseEventHandler } from "react";
import axios from "axios";
import { useCookie } from "next-cookie";

const ActiveChats = (cookie: string) => {
  const cokie = useCookie(cookie);
  const sender = cokie.get("name");

  const [reciever, setReciever] = React.useState("");
  const [activeChats, setActiveChats] = React.useState([]);
  const sendInvite = async () => {
    try {
      const res = axios.post(
        `http://localhost:4001/invites/${sender}/${reciever}`,
      );
      return true;
    } catch {
      return false;
    }
  };

  const getChats = async () => {
    try {
      const res = await axios.get("http://localhost:4001/accepted ");
      setActiveChats(res.data.invites);

      return true;
    } catch (error) {
      return false;
    }
  };

  React.useEffect(() => {
    getChats();
  }, []);

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    sendInvite();
  };
  return (
    <main onSubmit={sendInvite} className="active_chats">
      <h1>Your chats</h1>
      <input
        onChange={(e) => setReciever(e.target.value)}
        value={reciever}
        type="text"
        placeholder="Search user"
      />
      <button type="submit" onClick={handleSubmit}>
        Search
      </button>
      {activeChats.map((item, index) => {
        const { inviter, reciever, status } = item;

        return (
          <div key={index}>
            {inviter !== cokie.get("name") &&
              reciever === cokie.get("name") &&
              status === "accepted" && (
                <a
                  style={{
                    margin: "1rem",
                    width: "100%",
                    textAlign: "center",
                  }}
                  href="http://localhost:3000/messages/invites/dar"
                >
                  <div>
                    <div
                      style={{
                        padding: "2rem",
                        margin: "2rem",
                        background: "var(--off-blue)",
                        color: "var(--main-white)",
                      }}
                    >
                      <h1>{inviter}</h1>
                    </div>
                  </div>
                </a>
              )}
          </div>
        );
      })}
    </main>
  );
};

export default ActiveChats;
