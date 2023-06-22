import { NextPageContext } from 'next';
import { redirectTo } from './redirect';
import { sdk } from './sdk';
import { useCookie } from 'next-cookie';
import {
  REDIRECT_URL_CALLBACK,
  TOKEN,
  USER_ID,
} from '@chat-app/common/constants';

export interface ICtx extends NextPageContext {
  resolvedUrl: string;
}

const isAuth = async (ctx: ICtx): Promise<boolean> => {
  try {
    const cookie = useCookie(ctx);
    const userId = cookie.get(USER_ID);
    const token = cookie.get(TOKEN);
    console.log(userId, token, 'cookies');
    if (!userId || !token) return false;
    const { data: isValidToken } = await sdk.auth.jwtAuthControllerVerify({
      headers: { Authorization: `Bearer ${cookie.get(TOKEN)}` },
    });
    console.log(isValidToken, token);
    return isValidToken === true;
  } catch (error) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    console.log(error);
    return false;
  }
};

export const withAuthSync = (getServerSideProps?: any) => async (ctx: ICtx) => {
  const isUserAuth = await isAuth(ctx);
  const currPath = ctx.resolvedUrl;

  if (!isUserAuth && currPath !== '/') return redirectTo('/', ctx, currPath);
  if (getServerSideProps) {
    const gssp = await getServerSideProps(ctx);
    return {
      props: {
        cookie: ctx.req?.headers.cookie ?? '',
        ...gssp.props,
      },
    };
  }
  return {
    props: {
      cookie: ctx.req?.headers.cookie ?? '',
    },
  };
};

export const isAlreadyAuth =
  (getServerSideProps?: any) => async (ctx: ICtx) => {
    const isUserAuth = await isAuth(ctx);
    console.log('IS ALREADY AUTH', isUserAuth);
    const cookie = useCookie(ctx);
    const desiredURL: string = cookie.get(REDIRECT_URL_CALLBACK);
    const path: string = desiredURL || '/protected';
    if (isUserAuth && ctx.resolvedUrl !== path)
      return redirectTo(`/${path}`, ctx);
    if (getServerSideProps) {
      const gssp = await getServerSideProps(ctx);
      return {
        props: {
          cookie: ctx.req?.headers.cookie ?? '',
          ...ctx.query,
          ...gssp.props,
        },
      };
    }
    return {
      props: {
        cookie: ctx.req?.headers.cookie ?? '',
        ...ctx.query,
      },
    };
  };
