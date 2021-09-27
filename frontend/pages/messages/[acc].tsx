import React, { useState } from "react";
import ActiveChats from "../../components/ActiveChats";
import PendingChats from "../../components/PendingChats";
import FindFriends from "../../components/FindFriends";
import axios from "axios";
import { useCookie } from "next-cookie";
import { GetServerSideProps, NextPage } from "next";
import { useRouter } from "next/router";
import { io, Socket } from "socket.io-client";

const index: NextPage<{ cookie: string; chatRoom: string }> = (props) => {
  const router = useRouter();
  const cookie = useCookie(props.cookie);
  const cookieName = cookie.get("name");

  const [localStatus, setLocalStatus] = useState<string>("");
  const [reciever, setReciever] = useState<string | null>("");
  const [socketRef, setSocketRef] = useState<Socket | null>(null);
  const [contacts, setContacts] = useState([]);
  const [error, setError] = useState<string>("");

  const fetchInviteStatus = async () => {
    try {
      const res = await axios.get(
        `http://localhost:4001/invites/${cookieName}`,
      );

      const data = res.data.invites;
      setContacts(data);

      return true;
    } catch (error: any) {
      const data = error.response.data.error;
      setError(data);

      return false;
    }
  };

  const deleteCookies = () => {
    cookie.remove("name");
    router.push("/");
  };

  const deleteUser = async () => {
    try {
      deleteCookies();
      const res = await axios.delete(
        `http://localhost:4001/users/${cookieName}`,
      );
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

  const emitUsers = () => {
    socketRef?.emit("sender_reciever", {
      sender: cookieName,
      reciever: reciever,
    });
  };

  React.useEffect(() => {
    const socketConnect: Socket = io("http://localhost:4000");
    setSocketRef(socketConnect);
    return () => {
      socketRef && socketRef.disconnect();
    };
  }, []);

  React.useEffect(() => {
    validateUser();
    fetchInviteStatus();
  }, []);

  React.useEffect(() => {
    if (localStatus) {
      fetchInviteStatus();
    }
  }, [localStatus]);

  React.useEffect(() => {
    if (reciever) {
      emitUsers();
    }
  }, [reciever]);

  return (
    <div style={{ display: "flex" }}>
      <section className="active_chats">
        <FindFriends cookie={cookie} />
        {error ? (
          <div>
            <h1>You dont have available chats</h1>
          </div>
        ) : (
          contacts.map((item, index) => {
            if (item["status"] !== "accepted") return;
            return (
              <ActiveChats
                key={index}
                cookie={cookie}
                {...item}
                get={fetchInviteStatus}
              />
            );
          })
        )}
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
                console.log(item, index);
                return (
                  <PendingChats
                    key={index}
                    {...item}
                    localStatus={localStatus}
                    setLocalStatus={setLocalStatus}
                  />
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
        destination: `/`,
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
