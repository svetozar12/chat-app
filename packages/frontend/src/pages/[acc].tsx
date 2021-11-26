import React, { useState, useEffect } from "react";
import ActiveChats from "../components/ActiveChats";
import PendingChats from "../components/PendingChats";
import FindFriends from "../components/FindFriends";
import axios from "axios";
import { useCookie } from "next-cookie";
import { GetServerSideProps, NextPage } from "next";
import { useRouter } from "next/router";
import { io, Socket } from "socket.io-client";
import { useDispatch } from "react-redux";

//  !Socket ref types errors while prop dillling bellow in components
interface Ichats {
  _id: string;
  members: string[];
}

interface Iinvites {
  _id: string;
  inviter: string;
  reciever: string;
  status: string;
}

const index: NextPage<{ cookie: string; chatRoom: string }> = (props) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const cookie = useCookie(props.cookie);
  const cookieName = cookie.get("name");
  const [localStatus, setLocalStatus] = useState<string>("");
  const [socketRef, setSocketRef] = useState<Socket | null>(null);
  const [contacts, setContacts] = useState<Iinvites[]>([]);
  const [chatRooms, setChatRooms] = useState<Ichats[]>([]);

  const getChatRoom = async () => {
    try {
      const res = await axios.get(
        `http://localhost:4001/chat-room/?user_name=${cookie.get("name")}`,
      );
      const data = res.data.contacts;

      setChatRooms(data);
      return true;
    } catch (error) {
      return false;
    }
  };

  const fetchRecieverStatus = async () => {
    try {
      const res = await axios.get(
        `http://localhost:4001/invites/${cookieName}`,
      );
      const data = res.data.invites;
      setContacts(data);
      return true;
    } catch (error: any) {
      return false;
    }
  };

  const fetchInviteStatus = async () => {
    try {
      const res = await axios.get(
        `http://localhost:4001/invites/${cookieName}?status=accepted`,
      );
      const data = res.data.invites;
      console.log(data);

      setContacts(data);
      if (data.status === "declined") return false;
      return true;
    } catch (error) {
      return false;
    }
  };

  const deleteCookies = () => {
    cookie.remove("name");
    router.push("/");
    dispatch({ type: "SIGN_OUT" });
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

  useEffect(() => {
    validateUser();
    getChatRoom();
    fetchRecieverStatus();
    fetchInviteStatus();
  }, []);
  useEffect(() => {
    const socketConnect: Socket = io("http://localhost:4000", {
      transports: ["websocket"],
    });
    socketConnect.on("friend_request", () => {
      fetchRecieverStatus();
      getChatRoom();
      fetchInviteStatus();
    });

    socketConnect.on("send_friend_request", () => {
      fetchRecieverStatus();
      fetchInviteStatus();
    });

    socketConnect.emit("room", { user: cookieName });

    setSocketRef(socketConnect);
    return () => {
      socketRef && socketRef.disconnect();
    };
  }, []);

  console.log(socketRef);

  useEffect(() => {
    fetchRecieverStatus();
    fetchInviteStatus();
  }, [localStatus]);

  return (
    <div style={{ display: "flex" }}>
      <section className="active_chats">
        {socketRef && (
          <FindFriends cookieName={cookie.get("name")} socketRef={socketRef} />
        )}
        {socketRef &&
          chatRooms.map((item, index) => {
            const _id = item._id;
            const [user1, user2] = item.members;
            return (
              <ActiveChats
                key={index}
                _id={_id}
                user1={user1}
                user2={user2}
                cookieName={cookie.get("name")}
                socketRef={socketRef}
              />
            );
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
                return (
                  socketRef && (
                    <PendingChats
                      key={index}
                      socketRef={socketRef}
                      setLocalStatus={setLocalStatus}
                      {...item}
                      data={contacts}
                      items={item}
                    />
                  )
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
