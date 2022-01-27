import React, { useState, useEffect } from "react";
import ActiveChats from "../components/ActiveChats";
import FindFriends from "../components/FindFriends";
import ChatRoom from "../components/ChatRoom";
import axios from "axios";
import { useRouter } from "next/router";
import { useCookie } from "next-cookie";
import { GetServerSideProps, NextPage } from "next";
import { io, Socket } from "socket.io-client";
import { useSelector, useDispatch } from "react-redux";
import { InitialState2, InitialState3 } from "../redux/state";
import { requestUrl } from "../utils/hostUrl_requestUrl";
import ChatSettings from "../components/ChatSettings";
import HamburgerMenu from "../components/HamburgerMenu";
import { GrClose } from "react-icons/gr";
import Notifications_Modal from "../components/Notifications_Modal";
import { AddUsers_Modal } from "../components/AddUsers_Modal";
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
  const cookie = useCookie(props.cookie);
  const cookieName = cookie.get("name");
  const [localStatus, setLocalStatus] = useState<string>("");
  const [socketRef, setSocketRef] = useState<Socket | null>(null);
  const [contacts, setContacts] = useState<Iinvites[]>([]);
  const [chatRooms, setChatRooms] = useState<Ichats[]>([]);
  const [users, setUsers] = useState<any[]>([]);
  const route = useRouter();
  const state = useSelector(
    (state: { setReducer: InitialState2 }) => state.setReducer,
  );

  const inputState = useSelector(
    (state: { saveInputReducer: InitialState3 }) => state.saveInputReducer,
  );

  const getMembersSuggestions = async () => {
    try {
      const res = await axios.get(
        `${requestUrl}/invites/${cookieName}?status=accepted`,
      );

      const res_inviter = await axios.get(
        `${requestUrl}/invites/inviter/${cookieName}?status=accepted`,
      );
      const res_chat = await axios.get(
        `http://localhost:4002/chat-room${window.location.pathname}`,
      );
      const members_in_chat = res_chat.data.Message[0].members;
      const data1 = res.data.invites;
      const data2 = res_inviter.data.invites;
      const data = [...data1, ...data2];
      const usersArr: string[] = [];

      data.forEach((element) => {
        usersArr.push(element.inviter);
        usersArr.push(element.reciever);
      });
      let uniqueUsers: string[] = [];
      usersArr.forEach((element) => {
        if (!uniqueUsers.includes(element)) {
          uniqueUsers.push(element);
        }
      });
      uniqueUsers = uniqueUsers.filter(
        (element) => !members_in_chat.includes(element),
      );
      setUsers(uniqueUsers);
      return true;
    } catch (error) {
      return false;
    }
  };

  const getChatRoom = async () => {
    try {
      setChatRooms([]);
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
      setContacts([]);
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
      setContacts([]);
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

  const checkNotification = async () => {
    try {
      setContacts([]);
      const res = await axios.get(
        `${requestUrl}/invites/${cookieName}?status=recieved`,
      );
      const data = res.data.invites;
      dispatch({ type: "NOTIFICATION_NUMBER", payload: data.length });
      setContacts(data);
      if (data.status === "declined") return false;
      return true;
    } catch (error) {
      dispatch({ type: "NOTIFICATION_NUMBER", payload: 0 });
      return false;
    }
  };

  useEffect(() => {
    fetchRecieverStatus();
  }, [inputState.notification_number]);

  useEffect(() => {
    getMembersSuggestions();
  }, [route.asPath]);

  useEffect(() => {
    checkNotification();
    setContacts([]);
    getChatRoom();
    fetchRecieverStatus();
    fetchInviteStatus();
    const socketConnect: Socket = io("http://localhost:4000", {
      transports: ["websocket"],
    });
    socketConnect.on("friend_request", () => {
      fetchRecieverStatus();
      getChatRoom();
      fetchInviteStatus();
      checkNotification();
    });

    socketConnect.on("send_friend_request", () => {
      fetchRecieverStatus();
      fetchInviteStatus();
      checkNotification();
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
    checkNotification();
  }, [localStatus]);

  return (
    <div style={{ display: "flex", height: "100vh" }}>
      <section style={{ height: "30vh" }} className="hambruger_out_of_nav">
        <div className="div_out_of_nav">
          <HamburgerMenu />
        </div>
      </section>
      <section className={`active_chats ${!state.setMobileNav && "hide"}`}>
        {socketRef && (
          <FindFriends
            cookie={cookie}
            cookieName={cookie.get("name")}
            socketRef={socketRef}
          />
        )}
        <div
          className="flex "
          style={{
            overflow: "auto",
            width: "95%",
            height: "100%",
            flexDirection: "column",
            justifyContent: "flex-start",
          }}
        >
          <div
            style={{
              alignItems: "flex-start",
              padding: "0",
              flexDirection: "column",
              justifyContent: "flex-start",
            }}
            className={`chat-settings flex ${
              state.setChatSettings && "chat-settings-open"
            }`}
          >
            <div
              style={{ justifyContent: "flex-end" }}
              className={`chat-settings-close flex ${
                !state.setChatSettings && "hide"
              }`}
            >
              <GrClose
                onClick={() =>
                  dispatch({
                    type: "SET_CHAT_SETTINGS",
                    payload: !state.setChatSettings,
                  })
                }
              />
            </div>
            {socketRef && (
              <ChatSettings
                socketRef={socketRef}
                chatId={props.chatRoom}
                setLocalStatus={setLocalStatus}
                cookieName={cookie.get("name")}
              />
            )}
          </div>

          {socketRef &&
            chatRooms.map((item, index) => {
              return (
                <ActiveChats
                  key={index}
                  {...item}
                  cookieName={cookie.get("name")}
                  socketRef={socketRef}
                  chatId={props.chatRoom}
                />
              );
            })}
        </div>
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
          <div className="dash_board">
            {state.setFriendRequest && (
              <Notifications_Modal
                contacts={contacts}
                socketRef={socketRef}
                setLocalStatus={setLocalStatus}
              />
            )}

            {state.setModalInvite && (
              <AddUsers_Modal
                setLocalStatus={setLocalStatus}
                users={users}
                chatId={props.chatRoom}
              />
            )}
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
