import { QueryClient } from 'react-query';
import { getEnv, setBasePath, setPublicConfig } from '@chat-app/web/utils';
import { useEffect, useState } from 'react';
import axios from 'axios';
export const queryClient = new QueryClient();

export function useGetConfig() {
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
