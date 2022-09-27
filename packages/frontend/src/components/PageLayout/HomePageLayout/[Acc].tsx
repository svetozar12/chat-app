import { Box, HStack } from "@chakra-ui/react";
import HamburgerMenu from "components/HamburgerMenu";
import MainSection from "components/MainSection";
import MessagesSection from "components/MessagesSection";
import { useCookie } from "next-cookie";
import { Ichats, Iinvites } from "pages/[acc]";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import api_helper from "services/graphql/api_helper";
import ISave_inputState from "services/redux/reducer/save_inputReducer/state";
import { io, Socket } from "socket.io-client";

interface IApp {
  props: Record<string, any>;
}

const App = ({ props }: IApp) => {
  const cookie = useCookie(props.cookie);
  const user_id: string = cookie.get("id");
  const token: string = cookie.get("token");
  const chat_id = props.chatRoom.split("/")[0];
  // hooks
  const dispatch = useDispatch();
  const [chatRooms, setChatRooms] = useState<Ichats[]>([]);
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
    cookie.set("REDIRECT_URL_CALLBACK", window.location.pathname);
    const socketConnect: Socket = io("http://localhost:4000", {
      transports: ["websocket"],
    });

    socketConnect.on("friend_request", () => {
      getChatRoom();
      checkNotification();
    });

    socketConnect.on("send_friend_request", () => {
      console.log("recieved");

      checkNotification();
    });

    dispatch({ type: "SET_WS_CONNECTED", payload: socketConnect });
    return () => {
      socketConnect.disconnect();
      dispatch({ type: "SET_WS_CONNECTED", payload: null });
    };
  }, []);

  return (
    <HStack w="full" h="100vh">
      <HStack h="100vh" pos="absolute">
        <Box w="95%" h="100vh" zIndex={100} pos="relative">
          <HamburgerMenu />
        </Box>
      </HStack>
      <MainSection chatId={chat_id} chatRooms={chatRooms} />
      <MessagesSection chatId={chat_id} contacts={contacts} FetchInvites={FetchInvites} />
    </HStack>
  );
};

export default App;
