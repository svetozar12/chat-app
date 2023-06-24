import React, { useEffect, useState } from 'react';
import { setAccessToken } from '@chat-app/web/utils';
import { Socket, io } from 'socket.io-client';
import { MessageForm, MessageList } from './subcomponets';
import { CONNECT_EVENT, TOKEN } from '@chat-app/common/constants';
import Navbar from './subcomponets/Navbar';
import { getEnv } from '@chat-app/web/utils';
import Link from 'next/link';
import { useCookie } from 'next-cookie';

const Home = () => {
  const { socket } = useInitApp();
  if (!socket) return <>websocket did not load</>;
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
  const [socket, setSocket] = useState<Socket>(null);
  useEffect(() => {
    setAccessToken(token);
    const socketInstance = io(getEnv('NEXT_PUBLIC_WS_SERVER_URL'));
    socketInstance.on(CONNECT_EVENT, () => {
      console.log('connected');
      setSocket(socketInstance);
    });
    return () => {
      socketInstance.disconnect();
    };
  }, []);

  return { socket };
}

export default Home;
