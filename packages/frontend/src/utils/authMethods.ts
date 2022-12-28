/* eslint-disable react-hooks/rules-of-hooks */
import { NextPageContext } from 'next';
import { Cookie, useCookie } from 'next-cookie';
import jwtDecode from 'jwt-decode';
import axios from 'axios';
import redirectTo from './routing';
import { ICtx } from './auth';
import {
  AuthModel,
  LogoutDocument,
  LogoutMutation,
  LogoutMutationVariables,
  RefreshTokenDocument,
  RefreshTokenMutation,
  RefreshTokenMutationVariables,
} from 'services/generated';
import makeRequest from 'utils/makeRequest';

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

const getTokenExpirationSeconds = (token: string | undefined = '') => {
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
  const AccessToken: string = cookie.get('token');
  const RefreshToken: string = cookie.get('refresh_token');

  if (!AccessToken) {
    if (RefreshToken) {
      const data: any = await makeRequest(
        {
          gqlQuery: `
          mutation {
            refreshToken(auth:{userId: "${userId}", RefreshToken: "${RefreshToken}"}) {
              userId
              AccessToken
              RefreshToken
            }
          }`,
          path: '',
        },
        'refreshToken',
      );
      console.log(data, 'pedali s');

      const { AccessToken: Access_Token, RefreshToken: Refresh_Token } = data || {};

      if (axios.isAxiosError(RefreshToken)) {
        const cookies = cookie.getAll();
        const auth: AuthModel = { userId: cookie.get('id'), AccessToken: cookie.get('token') };
        makeRequest(
          {
            gqlQuery: `
        mutation {
          logoutUser(auth:{userId: "${auth.userId}", AccessToken: "${auth.AccessToken}"}) {
            Message
          }
        }`,
            path: '',
          },
          'logoutUser',
        );

        for (const key in cookies) cookie.remove(key);
        return false;
      }
      const accessExpirationTime = getTokenExpirationSeconds(Access_Token);
      const refresbExpirationTime = getTokenExpirationSeconds(Refresh_Token);

      cookie.set('token', Access_Token, { expires: new Date(accessExpirationTime) });
      cookie.set('refresh_token', Refresh_Token, { expires: new Date(refresbExpirationTime) });

      return true;
    }
    const cookies = cookie.getAll();
    const auth: AuthModel = { userId: cookie.get('id'), AccessToken: cookie.get('token') };
    makeRequest(
      {
        gqlQuery: `
    mutation {
      logoutUser(auth:{userId: "${auth.userId}", AccessToken: "${auth.AccessToken}"}) {
        Message
      }
    }`,
        path: '',
      },
      'logoutUser',
    );
    for (const key in cookies) cookie.remove(key);
    return false;
  }
  return false;
};

export const logout = async (ctx: ICtx) => {
  const cookie = useCookie(ctx);
  const cookies = cookie.getAll();
  const auth: AuthModel = { userId: cookie.get('id'), AccessToken: cookie.get('token') };
  makeRequest(
    {
      gqlQuery: `
  mutation {
    logoutUser(auth:{userId: "${auth.userId}", AccessToken: "${auth.AccessToken}"}) {
      Message
    }
  }`,
      path: '',
    },
    'logoutUser',
  );
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
