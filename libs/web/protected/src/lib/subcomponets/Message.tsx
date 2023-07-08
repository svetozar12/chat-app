import { CreateMessageDto } from '@chat-app/api/sdk';
import React, { FC } from 'react';
import { useQuery } from 'react-query';
import Avatar from './Avatar';
import { USER_QUERY, isValidUrl, sdk } from '@chat-app/web/shared';
import dayjs from 'dayjs';
import * as relativeTime from 'dayjs/plugin/relativeTime';
dayjs.extend(relativeTime.default);
interface IMessageListProps {
  message: CreateMessageDto;
}
const Message: FC<IMessageListProps> = ({
  message: { message, userId, createdAt },
}) => {
  const { data } = useQuery(USER_QUERY(userId), () =>
    sdk.user.userControllerFind(userId).then((data) => data.data)
  );
  if (!data) return <div className="flex my-2 h-12"></div>;
  const {
    photos: [{ value }],
    displayName,
  } = data;
  return (
    <div className="flex items-center py-3 text-base">
      <Avatar
        props={{ className: 'lg:w-12 lg:h-12 w-10 h-10 rounded-full' }}
        src={value}
      />
      <div>
        <div className="flex items-center gap-8 font-thin text-sm">
          <p className="text-lg font-semibold">{displayName}</p>
          <span className="font-thin opacity-50 align-middle">
            {dayjs(createdAt).fromNow()}
          </span>
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
