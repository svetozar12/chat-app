import { useCookie } from 'next-cookie';
import { NextPage } from 'next';
// components
import HomePageLayout from 'components/PageLayout/HomePageLayout';
import redirectTo from 'utils/routing';
import { isAuth } from 'utils/authMethods';
import withAuthSync, { ICtx } from '../utils/auth';
import generic from '../utils/generic';

export interface Ichats {
  _id: string;
  members: string[];
}

export interface Iinvites {
  _id: string;
  inviter: string;
  reciever: string;
  status: string;
}

const HomePage: NextPage<{ cookie: string; chatRoom: string }> = (props) => <HomePageLayout {...props} />;

export const getServerSideProps = withAuthSync(async (ctx: ICtx) => {
  const isUserAuth = await isAuth(ctx);
  const currPath = ctx.resolvedUrl;
  const cookie = useCookie(ctx);

  if (!isUserAuth && currPath !== '/') return redirectTo('/', ctx, (ctx.query.callback as string) || currPath);
  const chatInstance: any = await generic.getFirstChat(cookie.get('id'), cookie.get('token'));

  cookie.set('first_chat_id', chatInstance, {
    sameSite: 'strict',
    path: '/',
  });

  cookie.set('last_visited_chatRoom', chatInstance, {
    sameSite: 'strict',
    path: '/',
  });

  return {
    props: {
      chatRoom: ctx.query.acc,
    },
  };
});

export default HomePage;
