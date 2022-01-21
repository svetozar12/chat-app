import React, { useState, useEffect } from "react";
import ActiveChats from "../components/ActiveChats";
import PendingChats from "../components/PendingChats";
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
import User_list from "../components/User_list";
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

interface IUsers {
  _id: string;
  members: string[];
}

const homePage: NextPage<{ cookie: string; chatRoom: string }> = (props) => {
  const dispatch = useDispatch();
  const cookie = useCookie(props.cookie);
  const cookieName = cookie.get("name");
  const [localStatus, setLocalStatus] = useState<string>("");
  const [socketRef, setSocketRef] = useState<Socket | null>(null);
  const [contacts, setContacts] = useState<Iinvites[]>([]);
  const [chatRooms, setChatRooms] = useState<Ichats[]>([]);
  const [users, setUsers] = useState<IUsers[]>([]);

  const state = useSelector(
    (state: { setReducer: InitialState2 }) => state.setReducer,
  );

  const inputState = useSelector(
    (state: { saveInputReducer: InitialState3 }) => state.saveInputReducer,
  );

  const getUsersList = async (name: string) => {
    try {
      const res = await axios(
        `${requestUrl}/chat-room/${props.chatRoom}?username=${name}`,
      );
      const data = res.data.Message;
      setUsers(data);
      console.log(data);

      return true;
    } catch (error) {
      return false;
    }
  };

  React.useEffect(() => {
    getUsersList(cookie.get("name"));
  }, [useRouter().asPath]);

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
      console.log(data, "data");
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
    checkNotification();
    setContacts([]);
    getChatRoom();
    fetchRecieverStatus();
    fetchInviteStatus();
    getUsersList(cookie.get("name"));
  }, []);

  React.useEffect(() => {
    fetchRecieverStatus();
  }, [inputState.notification_number]);

  useEffect(() => {
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
    <div
      onClick={() => console.log("click")}
      style={{ display: "flex", height: "100vh" }}
    >
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
          className="flex"
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
            {state.setChatSettings && socketRef && (
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
              <div className="fRequests_modal">
                <section
                  style={{ position: "relative", textAlign: "center" }}
                  className="modal_heading flex"
                >
                  <div
                    style={{
                      width: "4rem",
                      height: "4rem",
                      visibility: "hidden",
                    }}
                  ></div>
                  <h1 style={{ padding: "0 25%" }}>Notifications</h1>
                  <div
                    onClick={() => {
                      dispatch({
                        type: "SET_FRIEND_REQUEST",
                        payload: !state.setFriendRequest,
                      });
                    }}
                    style={{ width: "4rem", height: "4rem" }}
                    className="circle_border absolute_top_right flex"
                  >
                    <GrClose style={{ width: "4rem", height: "4rem" }} />
                  </div>
                </section>
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
              </div>
            )}

            {state.setModalInvite && (
              <div className="fRequests_modal">
                <section
                  style={{ position: "relative", textAlign: "center" }}
                  className="modal_heading flex"
                >
                  <div
                    style={{
                      width: "4rem",
                      height: "4rem",
                      visibility: "hidden",
                    }}
                  ></div>
                  <h1 style={{ padding: "0 25%" }}>Add people</h1>
                  <div
                    onClick={() => {
                      dispatch({
                        type: "SET_MODAL_INVITE",
                        payload: !state.setModalInvite,
                      });
                    }}
                    style={{ width: "4rem", height: "4rem" }}
                    className="circle_border absolute_top_right flex"
                  >
                    <GrClose style={{ width: "4rem", height: "4rem" }} />
                  </div>
                </section>
                {users.map((item, index) => {
                  const newMembers = item.members.filter(
                    (element) => element != cookieName,
                  );
                  return (
                    <User_list
                      key={index}
                      _id={item._id}
                      members={newMembers}
                    />
                  );
                })}
              </div>
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
