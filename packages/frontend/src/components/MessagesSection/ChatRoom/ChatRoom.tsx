import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
// utils
import { useDispatch, useSelector } from 'react-redux';
import { useCookie } from 'next-cookie';
import { VStack } from '@chakra-ui/react';
import timeStamp from '../../../utils/timeStamp';
import { constants } from '../../../constants/index';
// components
import RenderChat from './RenderChat';
import ChatHeader from './ChatHeader';
import ChatRoomForm from './ChatRoomForm';
import SkelletonUserMessages from '../../Loading/SkelletonUserMessages';
// hooks
// services
import apiHelper from '../../../services/graphql/apiHelper';
import { InitialStateMessage } from '../../../services/redux/reducer/messageReducer/state';
import { IInitialSet } from '../../../services/redux/reducer/setReducer/state';
import { useAuth } from '../../../utils/SessionProvider';
import useThemeColors from '../../../hooks/useThemeColors';

interface IHome {
  chatId: string;
}

export interface IchatInstance {
  _id: string;
  sender: string;
  message: string;
  createdAt: string;
}

function ChatRoom({ chatId }: IHome) {
  const route = useRouter();
  const messageState = useSelector((state: { messageReducer: InitialStateMessage }) => state.messageReducer);
  const setState = useSelector((state: { setReducer: IInitialSet }) => state.setReducer);
  const cookie = useCookie();
  const {
    colors: { chatBg },
  } = useThemeColors();
  const user = useAuth();
  const userId: string = cookie.get('id');
  const token: string = cookie.get('token');
  const dispatch = useDispatch();
  const containerRef = React.useRef<null | HTMLDivElement>(null);

  const getRecentMessages = async () => {
    try {
      const res = await apiHelper.message.getAll({ userId, chatId, token, query: { page_size: 10, page_number: 1 } });

      res.forEach((element: any) => {
        dispatch({ type: 'MESSAGES', payload: element });
      });

      return true;
    } catch (error) {
      return false;
    }
  };

  useEffect(() => {
    dispatch({ type: 'SET_IS_MATCH', payload: false });
    if (location.href === `${constants.HOST_URL}/${chatId}`) dispatch({ type: 'SET_IS_MATCH', payload: true });
    dispatch({ type: 'RESET_MESSAGES' });
    getRecentMessages();
  }, [route.asPath]);

  const scrollHandler = async (e: React.UIEvent<HTMLElement>) => {
    try {
      if (e.currentTarget.scrollTop === 0) {
        dispatch({
          type: 'INCREMENT_PAGE_NUMBER',
          payload: setState.pageNumber,
        });
        const res = await apiHelper.message.getAll({
          userId,
          chatId,
          token,
          query: { page_size: 10, page_number: setState.pageNumber },
        });
        const data = res.reversedArr;

        data.forEach((element: any) => {
          dispatch({ type: 'PAGGINATION_MESSAGES', payload: element });
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
          mt={{ base: '2rem', lg: '-0.5rem !important' }}
          h="full"
          p="1rem"
          overflow="auto"
          bg={chatBg}
          ref={containerRef}
          onScroll={scrollHandler}
        >
          {messageState.messages.map((item, index) => {
            const { sender, message, createdAt } = item;
            const TimeStamp = timeStamp(createdAt);

            return <RenderChat key={index} chatId={chatId} id={item._id} sender={sender} timeStamp={TimeStamp} message={message} />;
          })}
        </VStack>
      ) : (
        <SkelletonUserMessages />
      )}

      <ChatRoomForm chatId={chatId} />
    </VStack>
  );
}

export default ChatRoom;
