import React, { FC, useEffect } from 'react';
import Message from './Message';
import { MESSAGES_QUERY } from '@chat-app/web/constants';
import { sdk } from '@chat-app/web/utils';
import { useQuery } from 'react-query';
import { MESSAGE_EVENT } from '@chat-app/common/constants';
import { Socket } from 'socket.io-client';
import { queryClient } from '../../../pages/_app';

interface IMessageListProps {
  socket: Socket;
}

const MessageList: FC<IMessageListProps> = ({ socket }) => {
  const [page, setPage] = React.useState(1);
  const LIMIT = 10;
  const ref = React.useRef<HTMLDivElement>(null);
  const { data, refetch, isFetching, isRefetching } = useQuery(
    MESSAGES_QUERY,
    () =>
      sdk.message
        .messageControllerFindAll(page, LIMIT)
        .then((data) => data.data),
    {
      keepPreviousData: true,
    }
  );

  const scrollHanler = (e: React.UIEvent<HTMLElement>) => {
    if (ref.current && !isFetching && data.length === LIMIT * page) {
      const newPage = page + 1;
      setPage(newPage);
      refetch({ queryKey: [MESSAGES_QUERY, newPage] });
      console.log(ref.current.scrollTop === 0);
    }
  };

  useEffect(() => {
    socket?.on(MESSAGE_EVENT, () => {
      queryClient.invalidateQueries({ queryKey: MESSAGES_QUERY });
    });
  }, []);

  useEffect(() => {
    if (ref.current) {
      const parent = ref.current;
      parent?.scrollTo(0, parent.scrollHeight);
    }
  }, [data]);
  // useOnMessage(socket);
  // useEffect(() => {
  // if (ref.current) {
  //   const parent = ref.current;
  //   parent?.scrollTo(0, parent.scrollHeight);
  // }
  // }, []);
  return (
    <div
      ref={ref}
      onScroll={scrollHanler}
      className="bg-black text-white h-2/4 overflow-auto"
    >
      {data.map((message) => {
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
