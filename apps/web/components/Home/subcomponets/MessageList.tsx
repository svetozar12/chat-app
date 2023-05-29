import React, { FC, useEffect } from 'react';
import Message from './Message';
import { MESSAGES_QUERY } from '@chat-app/web/constants';
import { sdk } from '@chat-app/web/utils';
import { useQuery } from 'react-query';
import { ISendMessage, MESSAGE_EVENT } from '@chat-app/common/constants';
import { Socket } from 'socket.io-client';
import { queryClient } from '../../../pages/_app';
import { CreateMessageDto } from '@chat-app/api/sdk';

interface IMessageListProps {
  socket: Socket;
}

const MessageList: FC<IMessageListProps> = ({ socket }) => {
  const { data, refetch } = useQuery(
    MESSAGES_QUERY,
    () => sdk.message.messageControllerFindAll().then((data) => data.data),
    {
      keepPreviousData: true,
      initialData: [],
    }
  );

  useEffect(() => {
    socket?.on(MESSAGE_EVENT, async (newMessage: ISendMessage) => {
      try {
        queryClient.setQueryData(
          MESSAGES_QUERY,
          (oldData: CreateMessageDto[]) => {
            return [...oldData, newMessage];
          }
        );
        await refetch();
      } catch (error) {
        throw new Error(error);
      }
    });
  }, []);

  return (
    <div className="bg-black text-white">
      {data.map((message) => {
        return <Message key={message._id} message={message} />;
      })}
    </div>
  );
};

export default MessageList;
