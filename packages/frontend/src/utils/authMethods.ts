import { NextPageContext } from "next";
import { Cookie, useCookie } from "next-cookie";
import api_helper from "../services/graphql/api_helper";

/**
 * This function will be used only in getServerSideProps Wrapper.
 *  It checks if avaliable cookie(token,refresh_token) are valid and returns true if they are !
 * @param {NextPageContext} ctx is Used as response from the next server
 */
export const isAuth = async (ctx: NextPageContext) => {
  const cookie = useCookie(ctx);

  const user_id: string = cookie.get("id");
  const access_token: string = cookie.get("token");
  const refresh_token: string = cookie.get("refresh_token");

  if (!access_token) {
    if (refresh_token) {
      const refreshedToken = await api_helper.auth.refresh(user_id, refresh_token);
      cookie.set("token", refreshedToken.access_token);
      cookie.set("refresh_token", refreshedToken.refresh_token);

      return true;
    }
    return false;
  }
  return true;
};

export const Login = async (username: string, password: string, cookie: Cookie) => {
  const res = await api_helper.auth.login(username, password);
  cookie.set("token", res.access_token);
  cookie.set("refresh_token", res.refresh_token);
};
