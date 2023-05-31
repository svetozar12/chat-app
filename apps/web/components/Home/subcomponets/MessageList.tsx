import React, { FC, useEffect } from 'react';
import Message from './Message';
import { MESSAGES_QUERY } from '@chat-app/web/constants';
import { sdk } from '@chat-app/web/utils';
import { useQuery } from 'react-query';
import { MESSAGE_EVENT } from '@chat-app/common/constants';
import { Socket } from 'socket.io-client';
import { queryClient } from '../../../pages/_app';
import { CreateMessageDto, GetMessageListDto } from '@chat-app/api/sdk';

interface IMessageListProps {
  socket: Socket;
}

const MessageList: FC<IMessageListProps> = ({ socket }) => {
  const INITIAL_PAGE = 1;
  const LIMIT = 10;
  const [page, setPage] = React.useState(INITIAL_PAGE);
  const ref = React.useRef<HTMLDivElement>(null);
  const { data, isFetching, isRefetching } = useQuery(
    MESSAGES_QUERY,
    () =>
      sdk.message
        .messageControllerFindAll(page, LIMIT)
        .then((data) => data.data),
    {
      keepPreviousData: true,
      refetchOnWindowFocus: false,
      initialData: {
        messages: [],
        pagination: { total: 0, limit: LIMIT, page: 1 },
      },
    }
  );

  const {
    messages,
    pagination: { total },
  } = data;
  const scrollHanler = async (e: React.UIEvent<HTMLElement>) => {
    // if (isFetching) return;
    if (e.currentTarget.scrollTop !== 0) return;
    if (messages.length >= total) return;
    if (ref.current && !isFetching) {
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
      });
    }
  };

  useEffect(() => {
    setPage(INITIAL_PAGE);
    socket?.on(MESSAGE_EVENT, () => {
      queryClient.invalidateQueries({ queryKey: MESSAGES_QUERY });
    });
  }, []);

  useEffect(() => {
    if (ref.current) {
      const parent = ref.current;
      parent?.scrollTo(0, parent.scrollHeight);
    }
  }, [messages]);
  // useOnMessage(socket);
  // useEffect(() => {
  // if (ref.current) {
  //   const parent = ref.current;
  //   parent?.scrollTo(0, parent.scrollHeight);
  // }
  // }, []);

  if (isFetching && !messages.length) return <p>Loading...</p>;

  return (
    <div
      ref={ref}
      onScroll={scrollHanler}
      className="bg-black text-white h-2/4 overflow-auto"
    >
      {messages.map((message) => {
        return (
          <Message key={message._id + message.createdAt} message={message} />
        );
      })}
    </div>
  );
};

export default MessageList;

function useOnMessage(socket: Socket) {
  useEffect(() => {
    socket?.on(MESSAGE_EVENT, () => {
      queryClient.invalidateQueries({ queryKey: MESSAGES_QUERY });
    });
  }, []);
}
