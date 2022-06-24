import { useCookie } from "next-cookie";
import { useEffect, useState } from "react";
import api_helper from "../services/graphql/api_helper";
import { checkTokens, logout } from "./authMethods";

function useProvideAuth() {
  const [user, setUser] = useState(null);
  const cookie = useCookie();

  const checkSession = async () => {
    await checkTokens(cookie);
  };

  if (cookie.getAll() === {}) return;
  const getUser = async () => {
    const user_id: string = cookie.get("id");
    const token: string = cookie.get("token");
    // setTimeout(async () => {}, 10000);
    const res = await api_helper.user.getById(user_id, token);
    setUser(res);
  };

  useEffect(() => {
    checkSession();
    getUser();
  }, []);

  return {
    user,
    logout,
  };
}

export default useProvideAuth;
