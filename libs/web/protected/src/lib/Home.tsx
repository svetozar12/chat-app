import React, { useEffect, useState } from 'react';
import { Socket, io } from 'socket.io-client';
import { MessageForm, MessageList } from './subcomponets';
import { CONNECT_EVENT, TOKEN } from '@chat-app/shared/common-constants';
import Navbar from './subcomponets/Navbar';
import { useCookie } from 'next-cookie';
import { WEB_ENVS, isMobile, setAccessToken } from '@chat-app/web/shared';
import Typing from './subcomponets/Typing';
import UsersList from './subcomponets/UsersList';

const { NEXT_PUBLIC_API_HOST, NEXT_PUBLIC_API_PORT, NEXT_PUBLIC_API_SCHEME } =
  WEB_ENVS;
const Home = () => {
  const { socket } = useInitApp();
  if (!socket) return <div className="bg-gray-primary w-full h-screen"></div>;
  return (
    <div className="flex bg-gray-primary">
      <div className="lg:w-5/6 w-full h-screen">
        <Navbar />
        <MessageList socket={socket} />
        <Typing socket={socket} />
        <MessageForm socket={socket} />
      </div>
      {!isMobile() && <UsersList />}
    </div>
  );
};
function useInitApp() {
  const cookie = useCookie();
  const token: string = cookie.get(TOKEN);
  const [socket, setSocket] = useState<Socket | null>(null);
  const wsScheme = NEXT_PUBLIC_API_SCHEME === 'https' ? 'wss' : 'ws';
  const wsUrl = `${wsScheme}://${NEXT_PUBLIC_API_HOST}:${NEXT_PUBLIC_API_PORT}`;
  useEffect(() => {
    setAccessToken(token);
    const socketInstance = io(wsUrl);
    socketInstance.on(CONNECT_EVENT, () => {
      setSocket(socketInstance);
    });
    return () => {
      socketInstance.disconnect();
    };
  }, []);

  return { socket };
}

export default Home;
