import { useState, useEffect } from "react";
import ActiveChats from "../components/ActiveChats/ActiveChats";
import FindFriends from "../components/FindFriends/FindFriends";
import ChatRoom from "../components/ChatRoom/ChatRoom";
import ChatSettings from "../components/ChatSettings/ChatSettings";
import HamburgerMenu from "../components/HamburgerMenu/HamburgerMenu";
import Notifications_Modal from "../components/Notifications_Modal/Notifications_Modal";
import { AddUsers_Modal } from "../components/AddUsers_Modal/AddUsers_Modal";
import axios from "axios";
import { useRouter } from "next/router";
import { useCookie } from "next-cookie";
import { GetServerSideProps, NextPage } from "next";
import { io, Socket } from "socket.io-client";
import { useSelector, useDispatch } from "react-redux";
import { InitialState2, InitialState3 } from "../redux/state";
import { requestUrl } from "../utils/hostUrl_requestUrl";
import { GrClose } from "react-icons/gr";
import { css, cx } from "@emotion/css";
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

const HomePage: NextPage<{ cookie: string; chatRoom: string }> = (props) => {
  const dispatch = useDispatch();
  const cookie = useCookie(props.cookie);
  const cookieName = cookie.get("name");
  const [localStatus, setLocalStatus] = useState<string>("");
  const [socketRef, setSocketRef] = useState<Socket | null>(null);
  const [contacts, setContacts] = useState<Iinvites[]>([]);
  const [chatRooms, setChatRooms] = useState<Ichats[]>([]);
  const [users, setUsers] = useState<any[]>([]);
  const route = useRouter();
  const state = useSelector((state: { setReducer: InitialState2 }) => state.setReducer);

  const inputState = useSelector((state: { saveInputReducer: InitialState3 }) => state.saveInputReducer);

  const fetchInviteStatus = async () => {
    try {
      setContacts([]);
      const res = await axios.get(`${requestUrl}/invites/${cookieName}?status=accepted`);
      const data = res.data.invites;
      setContacts(data);
      return data;
    } catch (error) {
      return false;
    }
  };

  const fetchInviterStatus = async () => {
    try {
      setContacts([]);
      const res = await axios.get(`${requestUrl}/invites/inviter/${cookieName}?status=accepted`);
      const data = res.data.invites;
      setContacts(data);
      return data;
    } catch (error) {
      return false;
    }
  };

  const getMembersSuggestions = async () => {
    try {
      const res = await fetchInviteStatus();
      const res_inviter = await fetchInviterStatus();
      const res_chat = await axios.get(`http://localhost:4002/chat-room${window.location.pathname}`);
      const members_in_chat = res_chat.data.Message[0].members;

      let data: any[] = [];
      if (res_inviter) data = [...res_inviter];
      if (res) data = [...data, ...res];
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
      uniqueUsers = uniqueUsers.filter((element) => !members_in_chat.includes(element));
      console.log(uniqueUsers, "sugestions");

      setUsers(uniqueUsers);
      return true;
    } catch (error) {
      console.log(error);

      return false;
    }
  };

  const getChatRoom = async () => {
    try {
      setChatRooms([]);
      const res = await axios.get(`${requestUrl}/chat-room/?user_name=${cookie.get("name")}`);
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

  const checkNotification = async () => {
    try {
      setContacts([]);
      const res = await axios.get(`${requestUrl}/invites/${cookieName}?status=recieved`);
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
    getMembersSuggestions();
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
    <div style={{ display: "flex", width: "100%", height: "100vh", position: "absolute" }}>
      <section
        className={css`
          height: 100vh;
          position: absolute;
          z-index: 9999;
          height: 30vh;
        `}
      >
        <div
          className={css`
            position: relative;
            width: 95%;
            height: 3rem;
            margin: 1rem;
            z-index: 100;
          `}
        >
          <HamburgerMenu />
        </div>
      </section>
      <section
        className={css`
          position: relative;
          transition-timing-function: ease-out;
          transition: 0.6s ease-out;
          background: var(--main-white);
          color: var(--main-whitre);
          border-right: 1px solid rgba(0, 0, 0, 0.1);
          text-align: center;
          overflow: hidden;
          height: 100vh;
          z-index: 20;
          width: 42%;
          flex-direction: column;
          justify-content: flex-start;
          flex-shrink: unset;
          display: flex;
          align-items: center;
          @media (max-width: 1008px) {
            ${!state.setMobileNav ? "width:0" : "width:80%"};
            position: absolute;
          }
        `}
      >
        {socketRef && <FindFriends cookie={cookie} cookieName={cookie.get("name")} socketRef={socketRef} />}
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
            className={cx(
              "flex",
              css`
                top: 0;
                left: 0;
                position: absolute;
                z-index: 11;
                width: 0;
                height: 88vh;
                background: var(--main-white);
                padding: 1rem;
                transition: 0.4s;
                align-items: flex-start;
                padding: 0;
                flex-direction: column;
                justify-content: flex-start;
                width: ${state.setChatSettings ? "100%" : "0"};
                height: 100vh;
              `,
              { ["chat-settings-open"]: state.setChatSettings },
            )}
          >
            <div
              className={cx(
                "flex",
                css`
                  justifycontent: flex-end;
                  position: absolute;
                  width: 95%;
                  margin: 1rem;
                  padding: 0 1rem;
                `,
              )}
            >
              <GrClose
                className={cx(
                  css`
                    width: 2rem;
                    height: 2rem;
                    cursor: pointer;
                    right: 0;
                    position: absolute;
                    z-index: 9999;
                    display: ${!state.setChatSettings && "none"};
                  `,
                )}
                onClick={() =>
                  dispatch({
                    type: "SET_CHAT_SETTINGS",
                    payload: !state.setChatSettings,
                  })
                }
              />
            </div>

            {socketRef && (
              <ChatSettings socketRef={socketRef} chatId={props.chatRoom} setLocalStatus={setLocalStatus} cookieName={cookie.get("name")} />
            )}
          </div>

          {socketRef &&
            chatRooms.map((item, index) => {
              return <ActiveChats key={index} {...item} cookieName={cookie.get("name")} socketRef={socketRef} chatId={props.chatRoom} />;
            })}
        </div>
      </section>
      <section
        className={cx(
          "flex",
          css`
          width: 75%;
          @media (max-width: 1008px) {
            width: 100%;
          },`,
        )}
      >
        {" "}
        <div
          className={cx(
            css`
              width: 100%;
              height: 90vh;
              justify-content: center;
              alignitems: center;
              padding: 0;
            `,
            "container",
          )}
        >
          <div
            className={cx(
              "flex",
              css`
                width: 100%;
                height: 100vh;
              `,
            )}
          >
            {state.setFriendRequest && <Notifications_Modal contacts={contacts} socketRef={socketRef} setLocalStatus={setLocalStatus} />}

            {state.setModalInvite && socketRef && (
              <AddUsers_Modal
                setLocalStatus={setLocalStatus}
                socketRef={socketRef}
                users={users}
                setUsers={setUsers}
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
  // eslint-disable-next-line react-hooks/rules-of-hooks
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

export default HomePage;
