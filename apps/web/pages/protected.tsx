import { sdk, setAccessToken, withAuthSync } from '@chat-app/web/utils';
import Home from '../components/Home/Home';
import { MESSAGES_QUERY } from '@chat-app/web/constants';
import { QueryClient, dehydrate } from 'react-query';
import { useCookie } from 'next-cookie';
import { TOKEN } from '@chat-app/common/constants';

function ProtectedPage() {
  return <Home />;
}

export const getServerSideProps = withAuthSync(async (ctx) => {
  const queryClient = new QueryClient();
  const cookie = useCookie(ctx);
  const token = cookie.get(TOKEN) as string;
  setAccessToken(token);
  await queryClient.prefetchQuery(MESSAGES_QUERY, () =>
    sdk.message
      .messageControllerFindAll(1, 10)
      .then((data) => data.data)
      .catch(() => [])
  );

  return {
    props: {
      dehydratedState: JSON.parse(JSON.stringify(dehydrate(queryClient))),
    },
  };
});

export default ProtectedPage;
