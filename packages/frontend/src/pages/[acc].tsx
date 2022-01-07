import React, { useState, useEffect } from "react";
import ActiveChats from "../components/ActiveChats";
import PendingChats from "../components/PendingChats";
import FindFriends from "../components/FindFriends";
import ChatRoom from "../components/ChatRoom";
import axios from "axios";
import { useCookie } from "next-cookie";
import { GetServerSideProps, NextPage } from "next";
import { useRouter } from "next/router";
import { io, Socket } from "socket.io-client";
import { useDispatch, useSelector } from "react-redux";
import { InitialState } from "../redux/state";
import { requestUrl } from "../utils/hostUrl_requestUrl";
import AddGroupChat from "../components/AddGroupChat";

interface Ichats {
  _id: string;
  members: string[];
}

export interface Iinvites {
  _id: string;
  inviter: string;
  reciever: string;
  status: string;
}

const homePage: NextPage<{ cookie: string; chatRoom: string }> = (props) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const cookie = useCookie(props.cookie);
  const cookieName = cookie.get("name");
  const [localStatus, setLocalStatus] = useState<string>("");
  const [socketRef, setSocketRef] = useState<Socket | null>(null);
  const [contacts, setContacts] = useState<Iinvites[]>([]);
  const [chatRooms, setChatRooms] = useState<Ichats[]>([]);

  const state = useSelector(
    (state: { authReducer: InitialState }) => state.authReducer,
  );

  const getChatRoom = async () => {
    try {
      const res = await axios.get(
        `${requestUrl}/chat-room/?user_name=${cookie.get("name")}`,
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
      const res = await axios.get(`${requestUrl}/invites/${cookieName}`);
      const data = res.data.invites;
      setContacts(data);
      return true;
    } catch (error) {
      return false;
    }
  };

  const fetchInviteStatus = async () => {
    try {
      const res = await axios.get(
        `${requestUrl}/invites/${cookieName}?status=accepted`,
      );
      const data = res.data.invites;
      setContacts(data);
      if (data.status === "declined") return false;
      return true;
    } catch (error) {
      return false;
    }
  };

  useEffect(() => {
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

  useEffect(() => {
    fetchRecieverStatus();
    fetchInviteStatus();
  }, [localStatus]);

  return (
    <div style={{ display: "flex" }}>
      <section className="active_chats">
        {socketRef && (
          <FindFriends
            cookie={cookie}
            cookieName={cookie.get("name")}
            socketRef={socketRef}
          />
        )}
        {socketRef &&
          chatRooms.map((item, homePage) => {
            const _id = item._id;
            const members = item.members;

            return (
              <ActiveChats
                key={homePage}
                _id={_id}
                members={members}
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
            width: "100%",
            height: "90vh",
            justifyContent: "center",
            alignItems: "center",
            padding: "0",
          }}
          className="container"
        >
          {state.toggleCreateGroup && socketRef && (
            <AddGroupChat
              socketRef={socketRef}
              cookieName={cookie.get("name")}
            />
          )}
          <div className="dash_board">
            {/* <ul style={{ overflow: "auto", overflowX: "hidden" }}>
              {contacts.map((item, homePage) => {
                return (
                  socketRef && (
                    <PendingChats
                      key={homePage}
                      socketRef={socketRef}
                      setLocalStatus={setLocalStatus}
                      {...item}
                    />
                  )
                );
              })}
            </ul> */}
            <ChatRoom cookie={cookie} chatId={props.chatRoom} />
          </div>
        </div>
      </section>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const cookie = useCookie(context);
  if (!cookie.has("name") && !cookie.has("token")) {
    return {
      redirect: {
        destination: `/`,
        permanent: false,
      },
    };
  }

  return {
    props: {
      cookie: context.req.headers.cookie || "",
      chatRoom: context.query.acc,
    },
  };
};

export default homePage;
