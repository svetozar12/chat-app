import '../globals.css';
import { QueryClient, QueryClientProvider } from 'react-query';

// Create a client
export const queryClient = new QueryClient();

function CustomApp({ Component, pageProps }) {
  return (
    <QueryClientProvider client={queryClient}>
      <Component {...pageProps} />;
    </QueryClientProvider>
  );
}

export default CustomApp;
