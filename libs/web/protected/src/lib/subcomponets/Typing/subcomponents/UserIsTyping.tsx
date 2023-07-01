import React, { FC } from 'react';
import { useQuery } from 'react-query';
import { USER_ID } from '@chat-app/shared/common-constants';
import { USER_QUERY, sdk } from '@chat-app/web/shared';
import { useCookie } from 'next-cookie';

interface IUserIsTypingProps {
  isTyping: boolean;
  typingUserId: string;
}

const UserIsTyping: FC<IUserIsTypingProps> = ({ isTyping, typingUserId }) => {
  const cookie = useCookie();
  const { data } = useQuery(USER_QUERY(typingUserId), () =>
    sdk.user.userControllerFind(userId).then((data) => data.data)
  );
  const userId = cookie.get(USER_ID) as string;
  const isMe = userId === typingUserId;
  if (!data || isMe || !isTyping) return <div></div>;
  const { displayName } = data || {};
  return (
    <>
      <p className="font-semibold">{displayName}</p> <p>is typing...</p>
    </>
  );
};

export default UserIsTyping;
