import axios from 'axios';
import { ACCESS_TOKEN, USER_ID } from 'constants/cookieNames';
import routes from 'constants/routes';
import { NextPageContext } from 'next';
import { useCookie } from 'next-cookie';
import { GetChatListDocument, GetChatListQueryResult, GetChatListQueryVariables } from 'services/generated';
import { gqlMakeRequest } from 'utils/makeRequest';
import { isAuth } from './authMethods';
import redirectTo from './routing';

export interface ICtx extends NextPageContext {
  resolvedUrl: string;
}

const withAuthSync = (getServerSideProps?: any) => async (ctx: ICtx) => {
  const isUserAuth = await isAuth(ctx);
  const currPath = ctx.resolvedUrl;

  if (!isUserAuth && currPath === '/logout') return redirectTo(routes.login, ctx);
  if (!isUserAuth && currPath !== '/') return redirectTo(routes.login, ctx, currPath);
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

export const isAlreadyAuth = (getServerSideProps?: any) => async (ctx: ICtx) => {
  const isUserAuth: any = await isAuth(ctx);
  const cookie = useCookie(ctx);
  const { data } = await gqlMakeRequest<GetChatListQueryResult, GetChatListQueryVariables>(GetChatListDocument, {
    auth: { userId: cookie.get(USER_ID), AccessToken: cookie.get(ACCESS_TOKEN) },
  });
  const { getAllChats } = data || {};
  if (getAllChats?.__typename === 'Error') throw new Error(getAllChats.message);
  const firstChatid = getAllChats?.res[0]._id;
  const desiredURL: string = cookie.get('REDIRECT_URL_CALLBACK');
  const path: string = desiredURL || (firstChatid as string);

  if (isUserAuth && ctx.resolvedUrl !== path) return redirectTo(`/${path}`, ctx);
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

export default withAuthSync;
