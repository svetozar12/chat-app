import React from 'react';
import { useCookie } from 'next-cookie';
import { sdk } from '@chat-app/web/utils';
import { useQuery } from 'react-query';
const Home = () => {
  const cookie = useCookie();
  const userId = cookie.get('user_id') as string;
  const token = cookie.get('jwt') as string;

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
  if (error) return <div>error</div>;
  const { data: messages } = data;
  return (
    <div className="bg-chatAppGray-100 w-full h-screen">
      <button onClick={logout} className="text-white">
        LOG OUT
      </button>
      <div className="bg-black">
        {messages.map(({ message, _id }) => (
          <div className="text-white" key={_id}>
            {message}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
