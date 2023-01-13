import { useCookie } from 'next-cookie';
import { NextPage } from 'next';
// components
import HomePageLayout from 'components/PageLayout/HomePageLayout';
import redirectTo from 'utils/routing';
import { isAuth } from 'utils/authMethods';
import withAuthSync, { ICtx } from '../utils/auth';
import { ssrGetChatList } from 'services/generated';
import { ACCESS_TOKEN, USER_ID } from 'constants/cookieNames';
import { client } from 'components/PageLayout/App/App';

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

const HomePage: NextPage<{ cookie: string; chatRoom: string }> = (props) => {
  return <HomePageLayout {...props} />;
};

export const getServerSideProps = withAuthSync(async (ctx: ICtx) => {
  const isUserAuth = await isAuth(ctx);
  const currPath = ctx.resolvedUrl;

  if (!isUserAuth && currPath !== '/') return redirectTo('/', ctx, (ctx.query.callback as string) || currPath);

  const cookie = useCookie(ctx);
  const {
    props: { data },
  } = await ssrGetChatList.getServerPage(
    { variables: { auth: { userId: cookie.get(USER_ID), AccessToken: cookie.get(ACCESS_TOKEN) } } },
    client,
  );

  const { getAllChats } = data;

  if (getAllChats?.__typename === 'Error') throw new Error(getAllChats.message);

  const firstChatid = getAllChats?.res[0]._id;
  cookie.set('first_chat_id', firstChatid, {
    sameSite: 'strict',
    path: '/',
  });

  cookie.set('last_visited_chatRoom', firstChatid, {
    sameSite: 'strict',
    path: '/',
  });

  return {
    props: {
      chatRoom: firstChatid,
    },
  };
});

export default HomePage;
