import React, { createContext, useContext } from 'react';
import { logout } from './authMethods';
import useProvideAuth from '../hooks/useSession';

const AuthContext = createContext({
  user: { _id: '', username: '', email: '' },
  logout,
});

interface ISessionProvider {
  children: JSX.Element | JSX.Element[];
}

function SessionProvider({ children }: ISessionProvider) {
  const auth = useProvideAuth();
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
}

export const useAuth = () => useContext(AuthContext);

export default SessionProvider;
