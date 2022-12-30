import { useCookie } from 'next-cookie';
import { NextPage } from 'next';
// components
import HomePageLayout from 'components/PageLayout/HomePageLayout';
import redirectTo from 'utils/routing';
import { isAuth } from 'utils/authMethods';
import withAuthSync, { ICtx } from '../utils/auth';
import generic from '../utils/generic';
import { useGetChatListQuery } from 'services/generated';
import useProvideAuth from 'hooks/useSession';

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
  const { auth } = useProvideAuth();
  const currPath = ctx.resolvedUrl;
  const cookie = useCookie(ctx);

  if (!isUserAuth && currPath !== '/') return redirectTo('/', ctx, (ctx.query.callback as string) || currPath);
  const { data: chatListData } = useGetChatListQuery({ variables: { auth } });
  const { getAllChats } = chatListData || {};
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
      chatRoom: ctx.query.acc,
    },
  };
});

export default HomePage;
