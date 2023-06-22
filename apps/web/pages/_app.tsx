import '../globals.css';
import { Hydrate, QueryClient, QueryClientProvider } from 'react-query';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { getEnv, setBasePath, setPublicConfig } from '@chat-app/web/utils';
// Create a client
export const queryClient = new QueryClient();

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

function useGetConfig() {
  const [config, setConfig] = useState({});
  async function getConfig() {
    const { data } = await axios.get('/api/config');
    setPublicConfig(data);
    setConfig(data);
    setBasePath(getEnv('NEXT_PUBLIC_API_URL'));
  }
  useEffect(() => {
    getConfig();
  }, []);

  return { config };
}
