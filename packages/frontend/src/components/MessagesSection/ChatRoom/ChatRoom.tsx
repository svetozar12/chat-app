import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
// utils
import { connect } from 'react-redux';
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
import { gqlSdk } from '@chat-app/sdk';
import { useAuth } from '../../../utils/SessionProvider';
import useThemeColors from '../../../hooks/useThemeColors';
import { STATE } from 'services/redux/reducer';
import { bindActionCreators, Dispatch } from 'redux';
import {
  incrementPaginationNumberAction,
  resetMessagesAction,
  setMessagesAction,
  setPaginatedMessagesAction,
} from 'services/redux/reducer/messages/actions';
import { IMessage } from 'services/redux/reducer/messages/state';
import { IToggle } from 'services/redux/reducer/toggles/state';
import { toggleIsMatch } from 'services/redux/reducer/toggles/actions';

interface IChatRoom {
  message: IMessage;
  toggle: IToggle;
  chatId: string;
  incrementPagination: typeof incrementPaginationNumberAction;
  setMessages: typeof setMessagesAction;
  setPaginatedMessages: typeof setPaginatedMessagesAction;
  resetMessages: typeof resetMessagesAction;
  toggleIsMatch: typeof toggleIsMatch;
}

export interface IchatInstance {
  _id: string;
  sender: string;
  message: string;
  createdAt: string;
}

function ChatRoom(props: IChatRoom) {
  const { chatId, incrementPagination, setPaginatedMessages, setMessages, resetMessages, message, toggle } = props;
  const { messagePageNumber, messages, show } = message;
  const route = useRouter();
  const cookie = useCookie();
  const {
    colors: { chatBg },
  } = useThemeColors();
  const user = useAuth();
  const userId: string = cookie.get('id');
  const token: string = cookie.get('token');
  const containerRef = React.useRef<null | HTMLDivElement>(null);

  const getRecentMessages = async () => {
    try {
      const res = await gqlSdk.message.getAll({ userId, chatId, token, query: { page_size: 10, page_number: 1 } });

      res.forEach((element: Record<string, any>) => {
        setMessages(element);
      });

      return true;
    } catch (error) {
      return false;
    }
  };

  useEffect(() => {
    toggleIsMatch(false);
    if (location.href === `${constants.HOST_URL}/${chatId}`) toggleIsMatch(true);
    resetMessages();
    getRecentMessages();
  }, [route.asPath]);

  const scrollHandler = async (e: React.UIEvent<HTMLElement>) => {
    try {
      if (e.currentTarget.scrollTop === 0) {
        incrementPagination(messagePageNumber);
        const res = await gqlSdk.message.getAll({
          userId,
          chatId,
          token,
          query: { page_size: 10, page_number: messagePageNumber },
        });
        const data = res.reversedArr;

        data.forEach((element: Record<string, any>) => {
          setPaginatedMessages(element);
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
  }, [messages]);

  return (
    <VStack w="full" h="100vh">
      {toggle.toggleCreateGroupModal && <ChatHeader />}

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
          {messages.map((item, index) => {
            const { sender, message, createdAt } = item;
            const TimeStamp = timeStamp(createdAt);

            return <RenderChat key={index} chatId={chatId} id={item._id} sender={sender} timeStamp={TimeStamp} recievedMessage={message} />;
          })}
        </VStack>
      ) : (
        <SkelletonUserMessages />
      )}

      <ChatRoomForm chatId={chatId} />
    </VStack>
  );
}

const mapStateToProps = (state: STATE) => ({
  message: state.messages,
  toggle: state.toggle,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  incrementPagination: bindActionCreators(incrementPaginationNumberAction, dispatch),
  setMessages: bindActionCreators(setMessagesAction, dispatch),
  setPaginatedMessages: bindActionCreators(setPaginatedMessagesAction, dispatch),
  toggleIsMatch: bindActionCreators(toggleIsMatch, dispatch),
  resetMessages: bindActionCreators(resetMessagesAction, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(ChatRoom);
