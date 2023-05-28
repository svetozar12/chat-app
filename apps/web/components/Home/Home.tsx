import React, { useEffect } from 'react';
import { useCookie } from 'next-cookie';
import { setAccessToken } from '@chat-app/web/utils';
import { LOGIN_ROUTE } from '@chat-app/web/constants';
import { Socket, io } from 'socket.io-client';
import { MessageForm, MessageList } from './subcomponets';
import { CONNECT_EVENT, TOKEN, USER_ID } from '@chat-app/common/constants';
import { commonEnvs } from '@chat-app/web/env';

const Home = () => {
  const { logout } = useInitApp();

  return (
    <div className="bg-chatAppGray-100 w-full h-screen">
      <button onClick={logout} className="text-white">
        LOG OUT
      </button>
      <MessageList />
      <MessageForm />
    </div>
  );
};
export let socket: Socket;
function useInitApp() {
  const cookie = useCookie();
  const userId = cookie.get(USER_ID) as string;
  const token = cookie.get(TOKEN) as string;
  const { NEXT_PUBLIC_WS_SERVER_URL } = commonEnvs;
  useEffect(() => {
    if (!userId || !token) return;
    setAccessToken(token);
    socket = io(NEXT_PUBLIC_WS_SERVER_URL);
    socket.on(CONNECT_EVENT, () => {
      console.log('connected');
    });
  }, []);

  function logout() {
    setAccessToken(undefined);
    for (const key in cookie.getAll()) {
      cookie.remove(key);
    }
    window.location.href = LOGIN_ROUTE;
  }

  return { logout };
}

export default Home;
