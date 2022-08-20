import { useCookie } from 'next-cookie';
import { useEffect, useState } from 'react';
import apiHelper from '../services/graphql/apiHelper';
import { checkTokens, logout } from './authMethods';

function useProvideAuth() {
  const [user, setUser] = useState(null);
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
    // setTimeout(async () => {}, 10000);
    const res = await apiHelper.user.getById(userId, token);
    setUser(res);
  };

  useEffect(() => {
    checkSession();
    getUser();
  }, []);

  if (cookie.getAll() === {}) return { user: '' };

  return {
    user,
    logout,
  };
}

export default useProvideAuth;
