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
      const response = await axios.get("http://localhost:4001/users");
      setContacts(response.data.users);
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
      return true;
    } catch (error) {
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
    fetchUsers();
  }, []);

  React.useEffect(() => {
    emitUsers();
  }, [reciever]);

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
            <ul style={{ overflowY: "auto", overflowX: "hidden" }}>
              {contacts.map((item, index) => {
                const { username } = item;
                return (
                  <a
                    onClick={() => setReciever(username)}
                    // href={`http://localhost:3000/messages/${cookieName}/${reciever}`}
                    key={index}
                  >
                    <div key={index}>
                      {username !== cookieName && (
                        <div className="contacts">
                          <h1>{username}</h1>
                          <p>Messages</p>
                        </div>
                      )}
                    </div>
                  </a>
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

  if (cookieName) {
    try {
      const res = await axios.get(`http://localhost:4001/users/${cookieName}`);
    } catch (error) {
      cookie.remove("name");
      return {
        redirect: {
          destination: "/",
          permanent: false,
        },
      };
    }
  }

  if (!cookieName) {
    return {
      redirect: {
        permanent: false,
        destination: "/",
      },
    };
  }

  return {
    props: {
      cookie: context.req.headers.cookie || "",
    },
  };
};

export default index;
