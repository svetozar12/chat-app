import React, { createContext, useContext } from "react";
import { checkTokens, logout } from "./authMethods";
import useProvideAuth from "./useSession";

const AuthContext = createContext({ user: { _id: "", username: "", email: "" }, logout });

interface ISessionProvider {
  children: JSX.Element | JSX.Element[];
}

const SessionProvider = ({ children }: ISessionProvider) => {
  const auth = useProvideAuth();
  // @ts-ignore
  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};

export default SessionProvider;
