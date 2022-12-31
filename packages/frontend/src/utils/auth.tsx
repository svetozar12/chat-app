import routes from 'constants/routes';
import { NextPageContext } from 'next';
import { useCookie } from 'next-cookie';
import { ssrGetChatList } from 'services/generated/ssr';
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
    console.log(error);
    return { props: {} };
  }
};

export const isAlreadyAuth = (getServerSideProps?: any) => async (ctx: ICtx) => {
  try {
    const isUserAuth: any = await isAuth(ctx);
    const cookie = useCookie(ctx);
    const {
      props: { data },
    } = await ssrGetChatList.getServerPage(
      { variables: { auth: { userId: cookie.get('id'), AccessToken: cookie.get('AccessToken') } } },
      ctx as any,
    );

    const { getAllChats } = data;
    if (getAllChats?.__typename === 'Error') throw new Error(getAllChats.message);
    const firstChatid = getAllChats?.res[0]._id;
    const desiredURL: string = cookie.get('REDIRECT_URL_CALLBACK');
    const path: string = desiredURL || (firstChatid as string);
    console.log(path, 'pathibngs');

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
  } catch (error) {
    console.log(error);
    return { props: {} };
  }
};

export default withAuthSync;
