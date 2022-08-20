/* eslint-disable react-hooks/rules-of-hooks */
import { NextPageContext } from 'next';
import { Cookie, useCookie } from 'next-cookie';
import jwtDecode from 'jwt-decode';
import axios from 'axios';
import apiHelper from '../services/graphql/apiHelper';
import redirectTo from './routing';
import { ICtx } from './auth';

interface IToken {
  _id: string;
  username: string;
  password: string;
  iat: number;
  exp: number;
}

/**
 * This util functions calculates how much time a given token will be valid
 * @param {string}token JWT token */

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
  const userId: string = cookie.get('id');
  const accessToken: string = cookie.get('token');
  const refreshToken: string = cookie.get('refresh_token');
  if (!accessToken) {
    if (refreshToken) {
      const refreshedToken = await apiHelper.auth.refresh(userId, refreshToken);
      if (axios.isAxiosError(refreshedToken)) {
        const cookies = cookie.getAll();
        await apiHelper.auth.logout(cookie.get('id'), cookie.get('token'));
        for (const key in cookies) cookie.remove(key);
        return false;
      }
      const accessExpirationTime = getTokenExpirationSeconds(refreshedToken.Access_token);
      const refresbExpirationTime = getTokenExpirationSeconds(refreshedToken.Refresh_token);

      cookie.set('token', refreshedToken.access_token, { expires: new Date(accessExpirationTime) });
      cookie.set('refresh_token', refreshedToken.refresh_token, { expires: new Date(refresbExpirationTime) });

      return true;
    }
    const cookies = cookie.getAll();
    await apiHelper.auth.logout(cookie.get('id'), cookie.get('token'));
    for (const key in cookies) cookie.remove(key);
    return false;
  }
  return true;
};

export const logout = async (ctx: ICtx) => {
  const cookie = useCookie(ctx);
  const cookies = cookie.getAll();
  await apiHelper.auth.logout(cookie.get('id'), cookie.get('token'));
  for (const key in cookies) cookie.remove(key);
  return redirectTo('/', ctx);
};

/**
 * This function will be used only in getServerSideProps Wrapper.
 *  It checks if avaliable cookie(token,refresh_token) are valid and returns true if they are !
 *  Also in the future all sort of user auth can be added here
 * @param {ICtx} ctx is Used as response from the next server
 */
export const isAuth = async (ctx: ICtx) => {
  const cookie = useCookie(ctx);

  return await checkTokens(cookie);
};

/**
 * Refresh session if refresh token is valid (works in server and client sidde)
 * @param {NextPageContext}ctx Only need to pass it in getServerSideprops || getInitialProps
 */
export const getAuth = async (ctx?: NextPageContext) => {
  let cookie: Cookie;
  if (ctx != null) {
    cookie = useCookie(ctx);
    return await checkTokens(cookie);
  }
  cookie = useCookie();
  return await checkTokens(cookie);
};
