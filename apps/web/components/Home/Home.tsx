import React, { useEffect, useState } from 'react';
import { useCookie } from 'next-cookie';
import { setAccessToken } from '@chat-app/web/utils';
import { LOGIN_ROUTE } from '@chat-app/web/constants';
import { Socket, io } from 'socket.io-client';
import { MessageForm, MessageList } from './subcomponets';
import { CONNECT_EVENT, TOKEN, USER_ID } from '@chat-app/common/constants';
import Navbar from './subcomponets/Navbar';
import { getEnv } from 'libs/web/utils/src/lib/env';

const Home = () => {
  const { logout, socket } = useInitApp();
  if (!socket) return;
  return (
    <div className="bg-chatAppGray-100 w-full h-screen">
      <Navbar />
      <button onClick={logout} className="text-white">
        LOG OUT
      </button>
      <MessageList socket={socket} />
      <MessageForm socket={socket} />
    </div>
  );
};
function useInitApp() {
  const [socket, setSocket] = useState<Socket>(null);
  const cookie = useCookie();
  const userId = cookie.get(USER_ID) as string;
  const token = cookie.get(TOKEN) as string;
  useEffect(() => {
    if (!userId || !token) return;
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

  function logout() {
    setAccessToken(undefined);
    for (const key in cookie.getAll()) {
      cookie.remove(key);
    }
    window.location.href = LOGIN_ROUTE;
  }

  return { logout, socket };
}

export default Home;
