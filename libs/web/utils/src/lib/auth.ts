import { NextPageContext } from 'next';
import { redirectTo } from './redirect';
import { config, sdk } from './sdk';
// import { LOGIN_ROUTE } from '@chat-app/web/constants';
// import { USER_ID } from '@chat-app/common/constants';
import { useCookie } from 'next-cookie';

export interface ICtx extends NextPageContext {
  resolvedUrl: string;
}

const isAuth = async (ctx: ICtx) => {
  try {
    const cookie = useCookie(ctx);
    const req = await sdk.user.userControllerFindAll({
      headers: { Authorization: `Bearer ${cookie.get('jwt')}` },
    });
    if (req.status != 403 && req.status != 401) {
      return true;
    }
    return false;
  } catch {
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
    const cookie = useCookie(ctx);
    // const { data } = await sdk.chat.chatControllerFindAll(
    //   cookie.get('user_id')
    // );
    // const firstChatid = data[0]._id;
    const desiredURL: string = cookie.get('REDIRECT_URL_CALLBACK');
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
