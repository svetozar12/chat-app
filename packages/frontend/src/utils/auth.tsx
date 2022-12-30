import { client } from 'components/PageLayout/App/App';
import routes from 'constants/routes';
import { NextPageContext } from 'next';
import { useCookie } from 'next-cookie';
import { GetChatDocument, GetChatListDocument, useGetChatListQuery } from 'services/generated';
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
  let dataRes;
  client
    .query({
      query: GetChatListDocument,
      variables: { auth: { userId: cookie.get('id'), AccessToken: cookie.get('AccessToken') } },
    })
    .then(({ data }) => {
      console.log(data);

      dataRes = data;
    })
    .catch((err) => console.log(err));
  console.log(dataRes, 'SHARO PEDALA');

  const { getAllChats } = dataRes || {};
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
