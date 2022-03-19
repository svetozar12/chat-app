import MainSection from "../components/MainSection";
import MessageSection from "../components/MessagesSection";
import { useState, useEffect } from "react";
import HamburgerMenu from "../components/HamburgerMenu";
import axios from "axios";
import { useCookie } from "next-cookie";
import { GetServerSideProps, NextPage } from "next";
import { io, Socket } from "socket.io-client";
import { useSelector, useDispatch } from "react-redux";
import ISave_inputState from "../redux/reducer/save_inputReducer/state";
import { requestUrl } from "../utils/hostUrl_requestUrl";
import { css } from "@emotion/css";
export interface Ichats {
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

  const [chatRooms, setChatRooms] = useState<Ichats[]>([]);
  const [socketRef, setSocketRef] = useState<Socket | null>(null);
  const [contacts, setContacts] = useState<Iinvites[]>([]);

  const inputState = useSelector((state: { saveInputReducer: ISave_inputState }) => state.saveInputReducer);
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
    dispatch({ type: "QUICK_LOGIN", payload: false });
    fetchRecieverStatus();
  }, [inputState.notification_number]);

  useEffect(() => {
    getChatRoom();
    checkNotification();
    setContacts([]);
    fetchRecieverStatus();
    fetchInviteStatus();
    const socketConnect: Socket = io("http://localhost:4000", {
      transports: ["websocket"],
    });
    socketConnect.on("friend_request", () => {
      getChatRoom();
      fetchRecieverStatus();
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
      <MainSection chatId={props.chatRoom} chatRooms={chatRooms} socketRef={socketRef} cookie={cookie} />
      <MessageSection
        chatId={props.chatRoom}
        contacts={contacts}
        socketRef={socketRef}
        cookie={cookie}
        fetchInviteStatus={fetchInviteStatus}
        fetchInviterStatus={fetchInviterStatus}
      />
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
