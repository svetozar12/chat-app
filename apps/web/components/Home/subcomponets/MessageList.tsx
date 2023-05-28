import React, { FC, useEffect } from 'react';
import Message from './Message';
import { MESSAGES_QUERY } from '@chat-app/web/constants';
import { sdk } from '@chat-app/web/utils';
import { useQuery } from 'react-query';
import { MESSAGE_EVENT } from '@chat-app/common/constants';
import { Socket } from 'socket.io-client';

interface IMessageListProps {
  socket: Socket;
}

const MessageList: FC<IMessageListProps> = ({ socket }) => {
  const { data, isFetching, refetch } = useQuery(MESSAGES_QUERY, () =>
    sdk.message.messageControllerFindAll().then((data) => data)
  );

  useEffect(() => {
    console.log(socket);
    socket?.on(MESSAGE_EVENT, async () => {
      try {
        await refetch();
      } catch (error) {
        throw new Error(error);
      }
    });
  }, []);

  if (isFetching) return <div>Loading...</div>;
  const { data: messages } = data || {};
  return (
    <div className="bg-black text-white">
      {messages.map((message) => {
        return <Message key={message._id} message={message} />;
      })}
    </div>
  );
};

export default MessageList;
