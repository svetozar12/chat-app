import { useCookie } from 'next-cookie';
import { NextPage } from 'next';
// components
import HomePageLayout from 'components/PageLayout/HomePageLayout';
import redirectTo from 'utils/routing';
import { isAuth } from 'utils/authMethods';
import withAuthSync, { ICtx } from '../utils/auth';
import { gqlMakeRequest } from 'utils/makeRequest';
import { GetChatListDocument, GetChatListQueryResult, GetChatListQueryVariables } from 'services/generated';
import { ACCESS_TOKEN, USER_ID } from 'constants/cookieNames';

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
  const cookie = useCookie(ctx);

  if (!isUserAuth && currPath !== '/') return redirectTo('/', ctx, (ctx.query.callback as string) || currPath);

  const { data } = await gqlMakeRequest<GetChatListQueryResult, GetChatListQueryVariables>(GetChatListDocument, {
    auth: { userId: cookie.get(USER_ID), AccessToken: cookie.get(ACCESS_TOKEN) },
  });
  const { getAllChats } = data || {};
  console.log(getAllChats);

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
