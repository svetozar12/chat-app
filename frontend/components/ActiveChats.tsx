import React from "react";
import axios from "axios";
import { useCookie } from "next-cookie";
import { GetServerSideProps, NextPage } from "next";

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
      const res = await axios.get("http://localhost:4001/recieved ");
      setActiveChats(res.data.invites);
      console.log(activeChats);

      return true;
    } catch (error) {
      return false;
    }
  };

  React.useEffect(() => {
    getChats();
  }, []);

  const handleSubmit = (e) => {
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
        return (
          <>
            {item.inviter !== cokie.get("name") &&
              item.reciever === cokie.get("name") && (
                <a
                  style={{
                    margin: "1rem",
                    width: "100%",
                    textAlign: "center",
                  }}
                  key={index}
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
                      <h1>{item.inviter}</h1>
                    </div>
                  </div>
                </a>
              )}
          </>
        );
      })}
    </main>
  );
};

export default ActiveChats;
