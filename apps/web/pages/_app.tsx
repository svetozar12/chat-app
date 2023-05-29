import '../globals.css';
import { Hydrate, QueryClient, QueryClientProvider } from 'react-query';

// Create a client
export const queryClient = new QueryClient();

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
