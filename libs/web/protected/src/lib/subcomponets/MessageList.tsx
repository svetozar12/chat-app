import React, { FC, useEffect } from 'react';
import Message from './Message';
import { MESSAGES_QUERY, sdk } from '@chat-app/web/shared';
import { useQuery } from 'react-query';
import { Socket } from 'socket.io-client';
import { GetMessageListDto } from '@chat-app/api/sdk';
import {
  ISendTyping,
  MESSAGE_EVENT,
  TYPING_EVENT,
} from '@chat-app/shared/common-constants';
import { queryClient } from '@chat-app/web/root-app';
import Typing from './Typing';

interface IMessageListProps {
  socket: Socket;
}

export const INITIAL_PAGE = 1;
export const LIMIT = 15;
const MessageList: FC<IMessageListProps> = ({ socket }) => {
  const [page, setPage] = React.useState(INITIAL_PAGE);
  const [isTyping, setIsTyping] = React.useState<ISendTyping>({
    isTyping: false,
    userId: '',
  });
  const ref = React.useRef<HTMLDivElement>(null);
  const { data, isFetching } = useQuery(
    MESSAGES_QUERY,
    () =>
      sdk.message
        .messageControllerFindAll(page, LIMIT)
        .then((data) => data.data),
    {
      refetchOnWindowFocus: false,
      initialData: {
        messages: [],
        pagination: { total: 0, limit: LIMIT, page: 1 },
      },
    }
  );

  const messages = data?.messages || [];
  const { total } = data?.pagination || { total: 0, limit: LIMIT, page: 1 };
  const scrollHanler = async ({
    currentTarget: { scrollTop },
  }: React.UIEvent<HTMLElement>) => {
    if (isFetching) return;
    if (scrollTop !== 0) return;
    if (messages.length >= total) return;
    if (!ref.current) return;
    const newPage = page + 1;
    setPage(newPage);
    const newPageMessages = await sdk.message.messageControllerFindAll(
      newPage,
      LIMIT
    );
    const parent = ref.current;
    parent?.scrollTo(0, parent.scrollHeight / 2);
    queryClient.setQueryData(MESSAGES_QUERY, (oldData: GetMessageListDto) => {
      oldData.messages.unshift(...newPageMessages.data.messages);
      return oldData;
    });
  };

  useEffect(() => {
    socket.on(TYPING_EVENT, (data) => {
      console.log(data);
      setIsTyping((prev) => {
        return {
          ...prev,
          [data.userId]: data.isTyping,
        };
      });
    });
    socket.on(MESSAGE_EVENT, (message) => {
      queryClient.setQueryData(
        MESSAGES_QUERY,
        ({ messages: oldMessages, pagination }: GetMessageListDto) => {
          const old = Array.isArray(oldMessages) ? oldMessages : [];
          return { messages: [...old, ...message.messages], pagination };
        }
      );
    });
  }, []);

  useEffect(() => {
    setPage(INITIAL_PAGE);
  }, []);

  useEffect(() => {
    if (ref.current) {
      const parent = ref.current;
      parent?.scrollTo(0, parent.scrollHeight);
    }
  }, [messages]);

  if (isFetching && messages.length < 1) return <p>Loading...</p>;
  return (
    <div
      ref={ref}
      onScroll={scrollHanler}
      className="text-white h-4/6 overflow-auto"
    >
      {messages.map((message) => {
        return (
          <Message key={message?._id + message?.createdAt} message={message} />
        );
      })}
      {Object.keys(isTyping).map((id) => {
        return <>{isTyping[id as keyof ISendTyping] && <Typing id={id} />}</>;
      })}
      {JSON.stringify(isTyping, null, 2)}
    </div>
  );
};

export default MessageList;
