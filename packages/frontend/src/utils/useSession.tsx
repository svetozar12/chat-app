import { useCookie } from "next-cookie";
import { useEffect, useState } from "react";
import api_helper from "../services/graphql/api_helper";
import { logout } from "./authMethods";

function useProvideAuth() {
  const [user, setUser] = useState(null);
  const cookie = useCookie();

  const user_id: string = cookie.get("id");
  const token: string = cookie.get("token");

  const getUser = async () => {
    const res = await api_helper.user.getById(user_id, token);
    setUser(res);
  };

  useEffect(() => {
    getUser();
  }, []);

  return {
    user,
    logout,
  };
}

export default useProvideAuth;
