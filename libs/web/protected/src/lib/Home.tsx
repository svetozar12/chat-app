import React, { useEffect, useState } from 'react';
import { Socket, io } from 'socket.io-client';
import { MessageForm, MessageList } from './subcomponets';
import { CONNECT_EVENT, TOKEN } from '@chat-app/shared/common-constants';
import Navbar from './subcomponets/Navbar';
import Link from 'next/link';
import { useCookie } from 'next-cookie';
import { WEB_ENVS, setAccessToken } from '@chat-app/web/shared';

const { NEXT_PUBLIC_API_HOST, NEXT_PUBLIC_API_PORT, NEXT_PUBLIC_API_SCHEME } =
  WEB_ENVS;
const Home = () => {
  const { socket } = useInitApp();
  if (!socket)
    return <div className="bg-chatAppGray-100 w-full h-screen"></div>;
  return (
    <div className="bg-chatAppGray-100 w-full h-screen">
      <Navbar />
      <Link href="/logout">LOGOUT</Link>
      <MessageList socket={socket} />
      <MessageForm socket={socket} />
    </div>
  );
};
function useInitApp() {
  const cookie = useCookie();
  const token: string = cookie.get(TOKEN);
  const [socket, setSocket] = useState<Socket | null>(null);
  const wsScheme = NEXT_PUBLIC_API_SCHEME === 'https' ? 'wss' : 'ws';
  const wsUrl = `${wsScheme}://${NEXT_PUBLIC_API_HOST}:${NEXT_PUBLIC_API_PORT}`;
  console.log(wsUrl);
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
