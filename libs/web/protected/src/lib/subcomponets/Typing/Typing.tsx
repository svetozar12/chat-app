import React, { FC, useEffect } from 'react';
import { ISendTyping, TYPING_EVENT } from '@chat-app/shared/common-constants';
import { Socket } from 'socket.io-client';
import UserIsTyping from './subcomponents/UserIsTyping';

type Props = {
  socket: Socket;
};
const Typing: FC<Props> = ({ socket }) => {
  const { usersTyping } = useIsTyping(socket);
  console.log(usersTyping);
  return (
    <div className="text-white flex gap-2">
      {Object.keys(usersTyping).map((userId) => {
        return (
          <UserIsTyping
            key={userId}
            isTyping={usersTyping[userId].isTyping}
            typingUserId={userId}
          />
        );
      })}
    </div>
  );
};

function useIsTyping(socket: Socket) {
  const [usersTyping, setUsersTyping] = React.useState<
    Record<string, { isTyping: boolean }>
  >({});
  useEffect(() => {
    socket.on(TYPING_EVENT, (data: ISendTyping) => {
      const { isTyping, userId } = data;
      setUsersTyping((prev) => ({ ...prev, [userId]: { isTyping } }));
    });

    return () => {
      socket.off(TYPING_EVENT);
    };
  }, []);
  return { usersTyping };
}

export default Typing;
