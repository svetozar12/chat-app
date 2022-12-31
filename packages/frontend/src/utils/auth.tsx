import axios from 'axios';
import routes from 'constants/routes';
import { NextPageContext } from 'next';
import { useCookie } from 'next-cookie';
import { GetChatListDocument, GetChatListQueryResult, GetChatListQueryVariables } from 'services/generated';
import { ssrGetChatList } from 'services/generated/ssr';
import sdk from 'services/sdk';
import { isAuth } from './authMethods';
import redirectTo from './routing';

export interface ICtx extends NextPageContext {
  resolvedUrl: string;
}

const withAuthSync = (getServerSideProps?: any) => async (ctx: ICtx) => {
  try {
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
  } catch (error) {
    if (getServerSideProps) {
      const gssp = await getServerSideProps(ctx);
      return {
        props: {
          cookie: ctx.req?.headers.cookie ?? '',
          ...gssp.props,
        },
      };
    }
    console.log(error, 'dragan');
    return { props: {} };
  }
};

export const isAlreadyAuth = (getServerSideProps?: any) => async (ctx: ICtx) => {
  const isUserAuth: any = await isAuth(ctx);
  const cookie = useCookie(ctx);
  const gqlUrl = `${process.env.NEXT_PUBLIC_GQL_PROTOCOL}://127.0.0.1:${process.env.NEXT_PUBLIC_GQL_PORT}/graphql`;
  const {
    data: { data },
  } = await axios.post<GetChatListQueryResult>(gqlUrl, {
    query: GetChatListDocument,
    variables: {
      auth: { userId: cookie.get('id'), AccessToken: cookie.get('AccessToken') },
    } as GetChatListQueryVariables,
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
