import { CreateMessageDto } from '@chat-app/api/sdk';
import { USER_QUERY } from '@chat-app/web/constants';
import { sdk } from '@chat-app/web/utils';
import React, { FC } from 'react';
import { useQuery } from 'react-query';
import Avatar from './Avatar';

interface IMessageListProps {
  message: CreateMessageDto;
}
const Message: FC<IMessageListProps> = ({
  message: { message, userId, _id },
}) => {
  console.log(userId);
  const { data, isLoading } = useQuery(USER_QUERY(userId), () =>
    sdk.user.userControllerFind(userId).then((data) => data)
  );
  if (isLoading) return <div>Loading...</div>;
  const {
    data: {
      photos: [{ value }],
      displayName,
    },
  } = data;
  return (
    <div className="flex my-2">
      <Avatar src={value} />
      <div>
        <p className="font-semibold">{displayName}</p>
        {message}
      </div>
    </div>
  );
};

export default Message;
