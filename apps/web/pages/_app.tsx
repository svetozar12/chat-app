import '../globals.css';
import { Hydrate, QueryClient, QueryClientProvider } from 'react-query';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { getEnv, setPublicConfig } from '../util';
// Create a client
export const queryClient = new QueryClient();

function CustomApp({ Component, pageProps }) {
  const [config, setConfig] = useState({});
  async function getConfig() {
    const { data } = await axios.get('/api/config');
    setPublicConfig(data);
    setConfig(data);
  }
  useEffect(() => {
    console.log('RENDERED');
    getConfig();
  }, []);
  if (JSON.stringify(config) === '{}') return;
  console.log(getEnv('NEXT_PUBLIC_API_URL'), 'ENV');
  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={pageProps.dehydratedState}>
        <Component {...pageProps} />;
      </Hydrate>
    </QueryClientProvider>
  );
}

export default CustomApp;
