import { GetUser, useGetUserByIdQuery, AuthModel } from 'services/generated/graphql';
import { useCookie } from 'next-cookie';
import { useEffect, useState } from 'react';
import sdk from 'services/sdk';
import { checkTokens, logout } from '../utils/authMethods';

function useProvideAuth() {
  const [user, setUser] = useState<GetUser | undefined>(undefined);
  const cookie = useCookie();
  const auth: AuthModel = { userId: cookie.get('id'), AccessToken: cookie.get('token') };
  const { data: userData } = useGetUserByIdQuery({ variables: { auth } });
  const checkSession = async () => {
    try {
      await checkTokens(cookie);
      return true;
    } catch (error) {
      return false;
    }
  };

  const getUser = async () => {
    setUser(userData?.getUser);
  };

  useEffect(() => {
    checkSession();
    getUser();
  }, []);

  if (!cookie.getAll()) return { user: undefined };

  return {
    user,
    auth: { userId: cookie.get('id'), AccessToken: cookie.get('token') },
    logout,
  };
}

export default useProvideAuth;
