import { CreateMessageDto } from '@chat-app/api/sdk';
import React, { FC } from 'react';
import { useQuery } from 'react-query';
import Avatar from './Avatar';
import { USER_QUERY, formatDate, isValidUrl, sdk } from '@chat-app/web/shared';

interface IMessageListProps {
  message: CreateMessageDto;
}
const Message: FC<IMessageListProps> = ({
  message: { message, userId, createdAt },
}) => {
  const MESSAGE_SENT_DATE = (createdAt && formatDate(createdAt)) || '';
  const { data } = useQuery(USER_QUERY(userId), () =>
    sdk.user.userControllerFind(userId).then((data) => data.data)
  );
  if (!data) return <div className="flex my-2 h-12"></div>;
  const {
    photos: [{ value }],
    displayName,
  } = data;
  return (
    <div className="flex py-3 text-base">
      <Avatar src={value} />
      <div>
        <div className="flex gap-8 font-thin text-sm">
          <p className="font-semibold">{displayName}</p>
          <p>{MESSAGE_SENT_DATE === 'Invalid Date' ? '' : MESSAGE_SENT_DATE}</p>
        </div>
        {isValidUrl(message) ? (
          <a
            className="underline text-blue-400"
            target="_blank"
            href={message}
            rel="noreferrer"
          >
            {message}
          </a>
        ) : (
          message
        )}
      </div>
    </div>
  );
};

export default Message;
