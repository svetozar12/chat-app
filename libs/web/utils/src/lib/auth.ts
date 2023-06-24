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
    if (!userId || !token) return false;
    const { data: isValidToken } = await sdk.auth.jwtAuthControllerVerify({
      headers: { Authorization: `Bearer ${cookie.get(TOKEN)}` },
    });
    return isValidToken === true;
  } catch (error) {
    return false;
  }
};

export const withAuthSync = (getServerSideProps?: any) => async (ctx: ICtx) => {
  const isUserAuth = await isAuth(ctx);
  const currPath = ctx.resolvedUrl;
  const cookie = useCookie(ctx);
  if (!isUserAuth && currPath !== '/') return redirectTo('/', ctx, currPath);
  if (getServerSideProps) {
    const gssp = await getServerSideProps(ctx);
    return {
      props: {
        cookie: cookie.getAll() ?? '',
        ...gssp.props,
      },
    };
  }
  return {
    props: {
      cookie: cookie.getAll() ?? '',
    },
  };
};

export const isAlreadyAuth =
  (getServerSideProps?: any) => async (ctx: ICtx) => {
    const isUserAuth = await isAuth(ctx);
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
