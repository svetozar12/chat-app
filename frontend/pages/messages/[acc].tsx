import React from "react";
import { useCookie } from "next-cookie";
import { GetServerSideProps, NextPage } from "next";
import { useRouter } from "next/router";
// componens
import ActiveChats from "../../components/ActiveChats";

import { io, Socket } from "socket.io-client";
import axios from "axios";
const index: NextPage<{ cookie: string; chatRoom: string | any }> = (props) => {
  const router = useRouter();

  const cookie = useCookie(props.cookie);
  const cookieName = cookie.get("name");
  const [reciever, setReciever] = React.useState<string | null>("");
  const [socketRef, setSocketRef] = React.useState<Socket | null>(null);
  const [contacts, setContacts] = React.useState([]);

  const fetchUsers = async () => {
    try {
      const res = await axios.get("http://localhost:4001/recieved");
      setContacts(res.data.invites);

      return true;
    } catch (error) {
      return false;
    }
  };

  const deleteCookies = () => {
    if (cookieName) {
      cookie.remove("name");
      router.push("/");
    }
  };

  const deleteUser = async () => {
    try {
      const res = await axios.delete(`http://localhost:4001/${cookieName}`);
      deleteCookies();
      return true;
    } catch (error) {
      return false;
    }
  };

  const validateUser = async () => {
    try {
      const res = await axios.get(`http://localhost:4001/users/${cookieName}`);
      if (!cookieName) throw Error;
      return true;
    } catch (error) {
      router.push("/");
      deleteCookies();
      return false;
    }
  };

  React.useEffect(() => {
    const socketConnect: Socket = io("http://localhost:4000");
    setSocketRef(socketConnect);
    return () => {
      socketRef && socketRef.disconnect();
    };
  }, []);

  React.useEffect(() => {
    fetchUsers();
  }, []);

  const emitUsers = () => {
    socketRef?.emit("sender_reciever", {
      sender: cookieName,
      reciever: reciever,
    });
  };

  // React.useEffect(() => {
  //   fetchUsers();
  //   console.log("render");
  // }, [contacts]);

  React.useEffect(() => {
    validateUser();
    fetchUsers();
  }, []);

  const updateInviteStatus = async (you: string) => {
    try {
      setReciever(you);
      console.log(you);

      const res = await axios.put(
        `http://localhost:4001/${you}/${cookie.get("name")}`,
        {
          status: "accepted",
        },
      );
    } catch (error) {}
  };

  const updateInviteStatusIgnore = async (you: string) => {
    try {
      console.log(you);

      const res = await axios.put(
        `http://localhost:4001/ignore/${you}/${cookie.get("name")}`,
        {
          status: "declined",
        },
      );
    } catch (error) {}
  };

  React.useEffect(() => {
    if (reciever) {
      emitUsers();
    }
  }, [reciever]);
  // hi
  return (
    <div style={{ display: "flex" }}>
      <section>
        <ActiveChats cookie={cookie} />
      </section>
      <section className="main_section">
        {" "}
        <div
          style={{
            height: "100vh",
            justifyContent: "flex-start",
            alignItems: "center",
          }}
          className="container"
        >
          <h1>You're logged in as {cookieName}</h1>
          <h2 className="log-out" onClick={deleteCookies}>
            Log out
          </h2>
          <h2 className="log-out" onClick={deleteUser}>
            Delete account
          </h2>
          <div className="dash_board">
            <ul style={{ overflow: "auto", overflowX: "hidden" }}>
              {contacts.map((item, index) => {
                const { inviter, reciever, status } = item;
                return (
                  <div key={index}>
                    {inviter !== cookie.get("name") &&
                      reciever === cookie.get("name") &&
                      status === "recieved" && (
                        <div className="contacts">
                          <h1>{inviter}</h1>
                          <p>Messages</p>
                          <div>
                            <button onClick={() => updateInviteStatus(inviter)}>
                              Accept
                            </button>
                            <button
                              onClick={() => updateInviteStatusIgnore(inviter)}
                            >
                              Ignore
                            </button>
                          </div>
                        </div>
                      )}
                  </div>
                );
              })}
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const cookie = useCookie(context);
  const cookieName = cookie.get("name");

  if (!cookieName) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  } else
    return {
      props: {
        cookie: context.req.headers.cookie || "",
      },
    };
};

export default index;
