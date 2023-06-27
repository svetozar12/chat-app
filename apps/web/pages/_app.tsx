import '../globals.css';
import { Hydrate, QueryClientProvider } from 'react-query';
import { useGetConfig, queryClient } from '@chat-app/web/root-app';

function CustomApp({ Component, pageProps }) {
  const { config } = useGetConfig();
  if (JSON.stringify(config) === '{}') return;
  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={pageProps.dehydratedState}>
        <Component {...pageProps} />;
      </Hydrate>
    </QueryClientProvider>
  );
}

export default CustomApp;
