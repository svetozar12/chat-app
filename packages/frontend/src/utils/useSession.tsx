import { useCookie } from "next-cookie";
import { useEffect, useState } from "react";
import api_helper from "../services/graphql/api_helper";
import { checkTokens, logout } from "./authMethods";

function useProvideAuth() {
  const [user, setUser] = useState(null);
  const cookie = useCookie();
  useEffect(() => {
    // this is a function which will be executed instantly
    (async () => checkTokens(cookie))();
  }, []);
  const user_id: string = cookie.get("id");
  const token: string = cookie.get("token");

  const getUser = async () => {
    setTimeout(async () => {
      console.log("dobro utro");
      const res = await api_helper.user.getById(user_id, token);
      setUser(res);
    }, 2000);
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
