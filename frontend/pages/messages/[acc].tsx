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
  const [status, setStatus] = React.useState<string>("");
  const [reciever, setReciever] = React.useState<string | null>("");
  const [socketRef, setSocketRef] = React.useState<Socket | null>(null);
  const [contacts, setContacts] = React.useState([]);

  const fetchInviteStatus = async () => {
    try {
      const res = await axios.get(
        `http://localhost:4001/invites/${cookieName}`,
      );
      const data = res.data.invites;

      setContacts(data);

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
      const res = await axios.delete(
        `http://localhost:4001/users/${cookieName}`,
      );
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

  const emitUsers = () => {
    socketRef?.emit("sender_reciever", {
      sender: cookieName,
      reciever: reciever,
    });
  };

  React.useEffect(() => {
    validateUser();
    fetchInviteStatus();
  }, []);

  const updateInviteStatus = async () => {
    try {
      console.log(reciever);

      const res = await axios.put(`http://localhost:4001/invites`, {
        reciever: cookieName,
        inviter: "ihoo",
        status: status, //will change it with state from buttons
      });
    } catch (error) {}
  };

  React.useEffect(() => {
    if (status) {
      updateInviteStatus();
    }
  }, [status]);

  React.useEffect(() => {
    if (reciever) {
      emitUsers();
    }
  }, [reciever]);

  return (
    <div style={{ display: "flex" }}>
      <section>
        {contacts.map((item, index) => {
          const { inviter, status } = item;
          return <ActiveChats key={index} {...item} cookie={cookie} />;
        })}
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
                const { inviter, status } = item;
                return (
                  <div key={index}>
                    {status === "recieved" && (
                      <div className="contacts">
                        <h1>{inviter}</h1>
                        <div className="invite_buttons">
                          <button
                            onClick={() => setStatus("accepted")}
                            className="accept"
                          >
                            Aceept
                          </button>
                          <button
                            onClick={() => setStatus("declined")}
                            className="decline"
                          >
                            Decline
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
