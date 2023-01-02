import { GetUser, useGetUserByIdQuery, AuthModel } from 'services/generated';
import { useCookie } from 'next-cookie';
import React, { useEffect, useState } from 'react';
import { checkTokens, logout } from '../utils/authMethods';
import { useDispatch } from 'react-redux';
import { setIsAuth } from 'services/redux/reducer/auth/actions';
import { ACCESS_TOKEN, USER_ID } from 'constants/cookieNames';

function useProvideAuth() {
  const [user, setUser] = useState<GetUser | undefined>(undefined);
  const cookie = useCookie();
  const auth: AuthModel = { userId: cookie.get(USER_ID), AccessToken: cookie.get(ACCESS_TOKEN) };
  const { data: userData } = useGetUserByIdQuery({ variables: { auth } });
  const dispatch = useDispatch();
  const checkSession = async () => {
    try {
      return await checkTokens(cookie);
    } catch (error) {
      return false;
    }
  };

  const getUser = () => {
    const { getUser } = userData || {};
    if (getUser?.__typename === 'Error') return setUser(undefined);
    setUser(getUser);
  };

  useEffect(() => {
    checkSession().then((isAuth) => {
      dispatch(setIsAuth(isAuth));
    });
    getUser();
  }, []);

  const authObj: AuthModel = { userId: cookie.get(USER_ID), AccessToken: cookie.get(ACCESS_TOKEN) };
  if (!cookie.getAll()) return { user: undefined, auth: authObj };
  return {
    user,
    auth: authObj,
    logout,
  };
}

export default useProvideAuth;
