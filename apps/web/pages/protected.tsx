import {
  sdk,
  setAccessToken,
  withAuthSync,
  MESSAGES_QUERY,
  USER_QUERY,
} from '@chat-app/web/shared';
import { QueryClient, dehydrate } from 'react-query';
import { useCookie } from 'next-cookie';
import { TOKEN, USER_ID } from '@chat-app/shared/common-constants';
import { Home, INITIAL_PAGE, LIMIT } from '@chat-app/web/protected';

function ProtectedPage() {
  return <Home />;
}

export const getServerSideProps = withAuthSync(async (ctx) => {
  const queryClient = new QueryClient();
  const cookie = useCookie(ctx);
  const token = cookie.get(TOKEN) as string;
  const userId = cookie.get(USER_ID) as string;

  setAccessToken(token);
  const messages = queryClient.prefetchQuery(MESSAGES_QUERY, () =>
    sdk.message
      .messageControllerFindAll(INITIAL_PAGE, LIMIT)
      .then((data) => data.data)
      .catch(() => [])
  );

  const user = queryClient.prefetchQuery(USER_QUERY(userId), () =>
    sdk.user
      .userControllerFind(userId)
      .then((data) => data.data)
      .catch(() => {
        return {};
      })
  );
  await Promise.all([messages, user]);

  return {
    props: {
      dehydratedState: JSON.parse(JSON.stringify(dehydrate(queryClient))),
    },
  };
});

export default ProtectedPage;
