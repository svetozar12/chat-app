import { useCookie } from 'next-cookie';
import { NextPage } from 'next';
// components
import HomePageLayout from 'components/PageLayout/HomePageLayout';
import redirectTo from 'utils/routing';
import { isAuth } from 'utils/authMethods';
import withAuthSync, { ICtx } from '../utils/auth';
import { ssrGetChatList } from 'services/generated/ssr';
import { withApollo } from 'utils/withApollo';

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
  try {
    const isUserAuth = await isAuth(ctx);
    const currPath = ctx.resolvedUrl;
    const cookie = useCookie(ctx);

    if (!isUserAuth && currPath !== '/') return redirectTo('/', ctx, (ctx.query.callback as string) || currPath);
    // const {
    //   props: { data },
    // } = await ssrGetChatList.getServerPage(
    //   { variables: { auth: { userId: cookie.get('id'), AccessToken: cookie.get('AccessToken') } } },
    //   ctx as any,
    // );

    // const { getAllChats } = data;
    // if (getAllChats?.__typename === 'Error') throw new Error(getAllChats.message);

    const firstChatid = 'getAllChats?.res[0]._id';

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
  } catch (error) {
    console.log('rengar', error);
    return { props: {} };
  }
});

export default withApollo(HomePage);
