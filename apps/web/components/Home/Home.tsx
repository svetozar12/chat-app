import React, { useEffect } from 'react';
import { useCookie } from 'next-cookie';
import { sdk } from '@chat-app/web/utils';
import { useQuery } from 'react-query';
import { io } from 'socket.io-client';
import { MESSAGE } from '@chat-app/common/constants';
const Home = () => {
  const cookie = useCookie();
  const userId = cookie.get('user_id') as string;
  const token = cookie.get('jwt') as string;

  useEffect(() => {
    const socket = io('ws://localhost:3000');

    socket.on('connect', () => {
      console.log('connected');
      socket.emit(MESSAGE, {
        chatInstance: '',
        sender: '',
        message: '',
      });
    });
  }, []);
  // Queries
  const { data, isLoading, error } = useQuery('messages', () =>
    sdk.message
      .messageControllerFindAll(userId, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((data) => data)
  );

  const logout = () => {
    for (const key in cookie.getAll()) {
      cookie.remove(key);
    }
    window.location.href = '/';
  };
  if (isLoading) return <div>Loading...</div>;
  const { data: messages } = data || {};
  return (
    <div className="bg-chatAppGray-100 w-full h-screen">
      <button onClick={logout} className="text-white">
        LOG OUT
      </button>
      <div className="bg-black">
        {messages?.map(({ message, _id }) => (
          <div className="text-white" key={_id}>
            {message}
          </div>
        ))}
      </div>
      <input type="text" />
    </div>
  );
};

export default Home;
