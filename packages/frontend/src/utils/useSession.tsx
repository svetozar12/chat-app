import { GetUser } from '@chat-app/graphql-server';
import { useCookie } from 'next-cookie';
import { useEffect, useState } from 'react';
import sdk from 'services/sdk';
import { checkTokens, logout } from './authMethods';

function useProvideAuth() {
  const [user, setUser] = useState<GetUser | null>(null);
  const cookie = useCookie();

  const checkSession = async () => {
    try {
      await checkTokens(cookie);
      return true;
    } catch (error) {
      return false;
    }
  };

  const getUser = async () => {
    const userId: string = cookie.get('id');
    const token: string = cookie.get('token');
    const auth = { userId, AccessToken: token };
    const res = await sdk.user.getUser({ auth });
    const { getUser } = res;
    setUser(getUser);
  };

  useEffect(() => {
    checkSession();
    getUser();
  }, []);

  if (!cookie.getAll()) return { user: null };

  return {
    user,
    auth: { userId: cookie.get('id'), AccessToken: cookie.get('token') },
    logout,
  };
}

export default useProvideAuth;
