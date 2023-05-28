import React, { FC, useEffect } from 'react';
import Message from './Message';
import { MESSAGES_QUERY } from '@chat-app/web/constants';
import { sdk } from '@chat-app/web/utils';
import { useQuery } from 'react-query';
import { socket } from '../Home';
import { MESSAGE_EVENT } from '@chat-app/common/constants';

const MessageList: FC = () => {
  const { data, isFetching, refetch } = useQuery(MESSAGES_QUERY, () =>
    sdk.message.messageControllerFindAll().then((data) => data)
  );

  useEffect(() => {
    socket.on(MESSAGE_EVENT, async () => {
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
