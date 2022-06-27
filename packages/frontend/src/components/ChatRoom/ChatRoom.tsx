import { NextPage } from "next";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
// utils
import timeStamp from "../../utils/timeStamp";
import { constants } from "../../constants";
// components
import RenderChat from "./RenderChat";
import ChatHeader from "../ChatHeader";
import ChatRoomForm from "./ChatRoomForm";
import SkelletonUserMessages from "../Loading/SkelletonUserMessages";
// hooks
import { useDispatch, useSelector } from "react-redux";
import { useCookie } from "next-cookie";
// services
import api_helper from "../../services/graphql/api_helper";
import { InitialStateMessage } from "../../services/redux/reducer/messageReducer/state";
import { IInitialSet } from "../../services/redux/reducer/setReducer/state";
import { VStack } from "@chakra-ui/react";
import { useAuth } from "../../utils/SessionProvider";

interface IHome {
  chatId: any;
}

export interface IchatInstance {
  _id: string;
  sender: string;
  message: string;
  createdAt: string;
}

const ChatRoom: NextPage<IHome> = ({ chatId }) => {
  const route = useRouter();
  const messageState = useSelector((state: { messageReducer: InitialStateMessage }) => state.messageReducer);
  const setState = useSelector((state: { setReducer: IInitialSet }) => state.setReducer);
  const cookie = useCookie();

  const user = useAuth();
  const user_id = cookie.get("id") as string;
  const token = cookie.get("token") as string;
  const dispatch = useDispatch();
  const containerRef = React.useRef<null | HTMLDivElement>(null);

  const getRecentMessages = async () => {
    try {
      const res = await api_helper.message.getAll({ user_id, chat_id: chatId, token, query: { page_size: 10, page_number: 1 } });

      res.forEach((element) => {
        dispatch({ type: "MESSAGES", payload: element });
      });

      return true;
    } catch (error) {
      return false;
    }
  };

  useEffect(() => {
    dispatch({ type: "SET_IS_MATCH", payload: false });
    if (location.href === constants.HOST_URL + "/" + chatId) dispatch({ type: "SET_IS_MATCH", payload: true });
    dispatch({ type: "RESET_MESSAGES" });
    getRecentMessages();
  }, [route.asPath]);

  const scrollHandler = async (e: React.UIEvent<HTMLElement>) => {
    try {
      if (e.currentTarget.scrollTop === 0) {
        dispatch({
          type: "INCREMENT_PAGE_NUMBER",
          payload: setState.pageNumber,
        });
        const res = await api_helper.message.getAll({
          user_id,
          chat_id: chatId,
          token,
          query: { page_size: 10, page_number: setState.pageNumber },
        });
        const data = res.reversedArr;

        data.forEach((element) => {
          dispatch({ type: "PAGGINATION_MESSAGES", payload: element });
        });
      }
      return true;
    } catch (error) {
      return false;
    }
  };

  const scrollToBottom = () => {
    const parent = containerRef.current;
    parent?.scrollTo(0, parent.scrollHeight);
  };

  React.useEffect(() => {
    scrollToBottom();
  }, [messageState.messages]);

  return (
    <VStack w="full" h="100vh">
      {setState.toggleCreateGroup && <ChatHeader />}

      {user ? (
        <VStack
          w="full"
          mt={{ base: "2rem", lg: "-0.5rem !important" }}
          h="full"
          p="1rem"
          overflow="auto"
          bg="main_white"
          ref={containerRef}
          onScroll={scrollHandler}
        >
          {messageState.messages.map((item, index) => {
            const { sender, message, createdAt } = item;
            const time_stamp = timeStamp(createdAt);

            return <RenderChat key={index} chatId={chatId} id={item._id} sender={sender} time_stamp={time_stamp} message={message} />;
          })}
        </VStack>
      ) : (
        <SkelletonUserMessages />
      )}

      <ChatRoomForm chatId={chatId} />
    </VStack>
  );
};

export default ChatRoom;
