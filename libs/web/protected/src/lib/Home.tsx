import React, { useEffect, useState } from 'react';
import { Socket, io } from 'socket.io-client';
import { MessageForm, MessageList } from './subcomponets';
import {
  CONNECT_EVENT,
  TOKEN,
  USER_ID,
  USER_STATUS_EVENT,
} from '@chat-app/shared/common-constants';
import Navbar from './subcomponets/Navbar';
import { useCookie } from 'next-cookie';
import { WEB_ENVS, isMobile, setAccessToken } from '@chat-app/web/shared';
import UsersList from './subcomponets/UsersList';
import { CreateUserDtoStatusEnum } from '@chat-app/api/sdk';
const { NEXT_PUBLIC_API_HOST, NEXT_PUBLIC_API_PORT, NEXT_PUBLIC_API_SCHEME } =
  WEB_ENVS;

const Home = () => {
  const { socket } = useInitApp();
  const { usersStatus } = useGetUsersStatus(socket);
  if (!socket) return <div className="bg-gray-primary w-full h-screen"></div>;
  return (
    <div className="flex bg-gray-primary">
      <div className="2xl:w-9/12 w-full h-screen">
        <Navbar />
        <MessageList socket={socket} />
        <MessageForm socket={socket} />
      </div>
      {!isMobile() && <UsersList usersStatus={usersStatus} />}
    </div>
  );
};
function useInitApp() {
  const cookie = useCookie();
  const token: string = cookie.get(TOKEN);
  const userId = cookie.get(USER_ID);
  const [socket, setSocket] = useState<Socket | null>(null);

  const wsScheme = NEXT_PUBLIC_API_SCHEME === 'https' ? 'wss' : 'ws';
  const wsUrl = `${wsScheme}://${NEXT_PUBLIC_API_HOST}:${NEXT_PUBLIC_API_PORT}`;
  useEffect(() => {
    setAccessToken(token);
    const socketInstance = io(wsUrl, { query: { userId } });
    socketInstance.on(CONNECT_EVENT, () => {
      setSocket(socketInstance);
    });
    return () => {
      socketInstance.disconnect();
      setSocket(null);
    };
  }, []);

  return { socket };
}

function useGetUsersStatus(socket: Socket | null) {
  const [usersStatus, setUsersStatus] = useState<{
    userId: string;
    status: CreateUserDtoStatusEnum;
  }>({ status: CreateUserDtoStatusEnum.Offline, userId: '' });

  useEffect(() => {
    socket?.on(USER_STATUS_EVENT, (data) => {
      setUsersStatus((prev) => ({ ...prev, ...data }));
    });
    return () => {
      socket?.off(USER_STATUS_EVENT);
    };
  }, []);
  return { usersStatus };
}

export default Home;
