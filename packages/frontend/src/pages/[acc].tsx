import { useState, useEffect } from "react";
import { useCookie } from "next-cookie";
import { GetServerSideProps, NextPage } from "next";
import { io, Socket } from "socket.io-client";
import { useSelector, useDispatch } from "react-redux";
import { css } from "@emotion/css";
// services
import ISave_inputState from "../services/redux/reducer/save_inputReducer/state";
import api_helper from "../services/graphql/api_helper";
// components
import MainSection from "../components/MainSection";
import MessageSection from "../components/MessagesSection";
import HamburgerMenu from "../components/HamburgerMenu";

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
  const cookie = useCookie(props.cookie);
  const user_id: string = cookie.get("id");
  const token: string = cookie.get("token");

  // hooks
  const dispatch = useDispatch();
  const [chatRooms, setChatRooms] = useState<Ichats[]>([]);
  const [socketRef, setSocketRef] = useState<Socket | null>(null);
  const [contacts, setContacts] = useState<Iinvites[]>([]);
  const inputState = useSelector((state: { saveInputReducer: ISave_inputState }) => state.saveInputReducer);

  const getChatRoom = async () => {
    try {
      setChatRooms([]);
      const res = await api_helper.chatroom.getAll(user_id, token);

      setChatRooms(res);
      return true;
    } catch (error) {
      return false;
    }
  };

  const FetchInvites = async (status: "accepted" | "recieved" | "declined", InvitesOrigin: "reciever" | "inviter") => {
    try {
      setContacts([]);
      if (InvitesOrigin === "reciever") {
        const res = await api_helper.invite.getAllByReciever({ user_id, token, status });
        if (res instanceof Error) throw Error(res.message);
        setContacts(res);
        return res;
      }
      const res = await api_helper.invite.getAllByInviter({ user_id, token, status: "accepted" });
      if (res instanceof Error) throw Error(res.message);
      setContacts(res);
      return res;
    } catch (error) {
      setContacts([]);
      return false;
    }
  };

  const checkNotification = async () => {
    try {
      setContacts([]);
      const res = await api_helper.invite.getAllByReciever({ user_id, token, status: "recieved" });
      if (res instanceof Error) throw Error(res.message);
      dispatch({ type: "NOTIFICATION_NUMBER", payload: res.length });
      console.log(res);

      setContacts(res);
      if (res.status === "declined") return false;
      return true;
    } catch (error) {
      dispatch({ type: "NOTIFICATION_NUMBER", payload: 0 });
      return false;
    }
  };

  useEffect(() => {
    dispatch({ type: "QUICK_LOGIN", payload: false });
    checkNotification();
  }, [inputState.notification_number]);

  useEffect(() => {
    getChatRoom();
    checkNotification();
    // FetchInvites("accepted", "reciever");
    // FetchInvites("accepted", "inviter");

    const socketConnect: Socket = io("http://localhost:4000", {
      transports: ["websocket"],
    });
    socketConnect.on("friend_request", () => {
      getChatRoom();
      // FetchInvites("accepted", "reciever");
      // FetchInvites("accepted", "inviter");
      checkNotification();
    });

    socketConnect.on("send_friend_request", () => {
      // FetchInvites("accepted", "reciever");
      // FetchInvites("accepted", "inviter");
      console.log("send fr");

      checkNotification();
    });

    socketConnect.emit("room", { user: cookie.get("id") });

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
      <MainSection chatId={props.chatRoom} chatRooms={chatRooms} socketRef={socketRef} />
      <MessageSection chatId={props.chatRoom} contacts={contacts} socketRef={socketRef} FetchInvites={FetchInvites} />
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
