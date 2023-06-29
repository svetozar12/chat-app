import React, { FC, useEffect } from 'react';
import { useQuery } from 'react-query';
import { USER_QUERY, sdk } from '@chat-app/web/shared';
import { useCookie } from 'next-cookie';
import {
  ISendTyping,
  TYPING_EVENT,
  USER_ID,
} from '@chat-app/shared/common-constants';
import { Socket } from 'socket.io-client';

type Props = {
  socket: Socket;
};
const Typing: FC<Props> = ({ socket }) => {
  const {
    isTyping: { isTyping, userId: typingUserId },
  } = useIsTyping(socket);
  const { data } = useQuery(USER_QUERY(typingUserId), () =>
    sdk.user.userControllerFind(userId).then((data) => data.data)
  );
  const cookie = useCookie();
  const userId = cookie.get(USER_ID) as string;
  const isMe = userId === userId;
  if (!data || isMe || !isTyping) return <div></div>;
  const { displayName } = data || {};
  console.log(displayName);
  return (
    <div className="text-white flex gap-2">
      <p className="font-semibold">{displayName}</p> <p>is typing...</p>
    </div>
  );
};

function useIsTyping(socket: Socket) {
  const [isTyping, setIsTyping] = React.useState<ISendTyping>({
    isTyping: false,
    userId: '',
  });
  useEffect(() => {
    socket.on(TYPING_EVENT, (data) => {
      setIsTyping(data);
    });

    return () => {
      socket.off(TYPING_EVENT);
    };
  }, []);
  return { isTyping };
}

export default Typing;
