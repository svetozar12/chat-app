import { GetUser, useGetUserByIdQuery, AuthModel } from 'services/generated';
import { useCookie } from 'next-cookie';
import { useEffect, useState } from 'react';
import { checkTokens, logout } from '../utils/authMethods';
import { useDispatch } from 'react-redux';
import { setIsAuth } from 'services/redux/reducer/auth/actions';

function useProvideAuth() {
  const [user, setUser] = useState<GetUser | undefined>(undefined);
  const cookie = useCookie();
  const auth: AuthModel = { userId: cookie.get('id'), AccessToken: cookie.get('token') };
  const { data: userData } = useGetUserByIdQuery({ variables: { auth } });
  const dispatch = useDispatch();
  const checkSession = async () => {
    try {
      return await checkTokens(cookie);
    } catch (error) {
      return false;
    }
  };

  const getUser = async () => {
    setUser(userData?.getUser);
  };

  useEffect(() => {
    checkSession().then((isAuth) => {
      console.log(isAuth, 'asen');
      dispatch(setIsAuth(isAuth));
    });
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
