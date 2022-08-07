/* eslint-disable react-hooks/rules-of-hooks */
import { NextPageContext } from "next";
import { Cookie, useCookie } from "next-cookie";
import api_helper from "../services/graphql/api_helper";
import jwtDecode from "jwt-decode";
import redirectTo from "./routing";
import { ICtx } from "./auth";
import axios from "axios";

interface IToken {
  _id: string;
  username: string;
  password: string;
  iat: number;
  exp: number;
}

/**
 * This util functions calculates how much time a given token will be valid
 * @param {string}token JWT token*/

const getTokenExpirationSeconds = (token: string) => {
  const decodedToken: IToken = jwtDecode(token);
  const expDate = new Date();
  expDate.setUTCSeconds(decodedToken.exp);
  return expDate;
};

/**
 * This function will check if refresh token is valid and if it is it will refresh both tokens
 * otherwise it will return false
 * @param {Cookie}cookie this is cookie instance, it`s used to get cookies from the browser
 * */
export const checkTokens = async (cookie: Cookie) => {
  const user_id: string = cookie.get("id");
  const access_token: string = cookie.get("token");
  const refresh_token: string = cookie.get("refresh_token");
  if (!access_token) {
    if (refresh_token) {
      const refreshedToken = await api_helper.auth.refresh(user_id, refresh_token);
      if (axios.isAxiosError(refreshedToken)) {
        const cookies = cookie.getAll();
        await api_helper.auth.logout(cookie.get("id"), cookie.get("token"));
        for (const key in cookies) cookie.remove(key);
        return false;
      }
      const accessExpirationTime = getTokenExpirationSeconds(refreshedToken.Access_token);
      const refresbExpirationTime = getTokenExpirationSeconds(refreshedToken.Refresh_token);

      cookie.set("token", refreshedToken.access_token, { expires: new Date(accessExpirationTime) });
      cookie.set("refresh_token", refreshedToken.refresh_token, { expires: new Date(refresbExpirationTime) });

      return true;
    }
    const cookies = cookie.getAll();
    await api_helper.auth.logout(cookie.get("id"), cookie.get("token"));
    for (const key in cookies) cookie.remove(key);
    return false;
  }
  return true;
};

export const logout = async (ctx: ICtx) => {
  const cookie = useCookie(ctx);
  const cookies = cookie.getAll();
  await api_helper.auth.logout(cookie.get("id"), cookie.get("token"));
  for (const key in cookies) cookie.remove(key);
  return redirectTo("/", ctx);
};

/**
 * This function will be used only in getServerSideProps Wrapper.
 *  It checks if avaliable cookie(token,refresh_token) are valid and returns true if they are !
 *  Also in the future all sort of user auth can be added here
 * @param {ICtx} ctx is Used as response from the next server
 */
export const isAuth = async (ctx) => {
  const cookie = useCookie(ctx);

  return checkTokens(cookie);
};

/**
 * Refresh session if refresh token is valid (works in server and client sidde)
 * @param {NextPageContext}ctx Only need to pass it in getServerSideprops || getInitialProps
 */
export const getAuth = (ctx?: NextPageContext) => {
  let cookie: Cookie;
  if (ctx) {
    cookie = useCookie(ctx);
    return checkTokens(cookie);
  }
  cookie = useCookie();
  return checkTokens(cookie);
};
