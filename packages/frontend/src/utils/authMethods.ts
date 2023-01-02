/* eslint-disable react-hooks/rules-of-hooks */
import { NextPageContext } from 'next';
import { Cookie, useCookie } from 'next-cookie';
import jwtDecode from 'jwt-decode';
import axios from 'axios';
import redirectTo from './routing';
import { ICtx } from './auth';
import { gqlMakeRequest } from 'utils/makeRequest';
import {
  LogoutDocument,
  LogoutMutationResult,
  LogoutMutationVariables,
  RefreshTokenDocument,
  RefreshTokenMutationResult,
  RefreshTokenMutationVariables,
} from 'services/generated';
import { ACCESS_TOKEN, REFRESH_TOKEN, USER_ID } from 'constants/cookieNames';

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
  const userId: string = cookie.get(USER_ID);
  const AccessToken: string = cookie.get(ACCESS_TOKEN);
  const RefreshToken: string = cookie.get(REFRESH_TOKEN);

  if (!AccessToken) {
    if (RefreshToken) {
      const { data } = await gqlMakeRequest<RefreshTokenMutationResult, RefreshTokenMutationVariables>(RefreshTokenDocument, {
        userId,
        RefreshToken: cookie.get(REFRESH_TOKEN),
      });
      const { refreshToken } = data || {};
      if (refreshToken?.__typename === 'Error') {
        const cookies = cookie.getAll();
        await gqlMakeRequest<LogoutMutationResult, LogoutMutationVariables>(LogoutDocument, {
          auth: { userId, AccessToken: cookie.get(ACCESS_TOKEN) },
        });
        for (const key in cookies) cookie.remove(key);
        return false;
      }
      const { AccessToken: Access_Token, RefreshToken: Refresh_Token } = refreshToken || {};

      const accessExpirationTime = getTokenExpirationSeconds(Access_Token as string);
      const refresbExpirationTime = getTokenExpirationSeconds(Refresh_Token as string);

      cookie.set(ACCESS_TOKEN, Access_Token, { expires: new Date(accessExpirationTime) });
      cookie.set(REFRESH_TOKEN, Refresh_Token, { expires: new Date(refresbExpirationTime) });

      return true;
    }
    const cookies = cookie.getAll();
    await gqlMakeRequest<LogoutMutationResult, LogoutMutationVariables>(LogoutDocument, {
      auth: { userId, AccessToken: cookie.get(ACCESS_TOKEN) },
    });
    for (const key in cookies) cookie.remove(key);
    return false;
  }
  return true;
};

export const logout = async (ctx: ICtx) => {
  const cookie = useCookie(ctx);
  const cookies = cookie.getAll();
  await gqlMakeRequest<LogoutMutationResult, LogoutMutationVariables>(LogoutDocument, {
    auth: { userId: cookie.get(USER_ID), AccessToken: cookie.get(ACCESS_TOKEN) },
  });
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
  if (ctx) {
    cookie = useCookie(ctx);
    return await checkTokens(cookie);
  }
  cookie = useCookie();
  return await checkTokens(cookie);
};
