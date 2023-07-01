import '../globals.css';
import { Hydrate, QueryClientProvider } from 'react-query';
import { queryClient } from '@chat-app/web/root-app';

function CustomApp({ Component, pageProps }) {
  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={pageProps.dehydratedState}>
        <Component {...pageProps} />;
      </Hydrate>
    </QueryClientProvider>
  );
}

export default CustomApp;
