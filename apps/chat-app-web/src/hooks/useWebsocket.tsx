import React, { useEffect, useState } from 'react';
import { WebSocketWrapper } from '../utils/websocket';
import { envs } from '../utils/env';

export const useWebsocket = () => {
  const [ws, setWs] = useState<WebSocketWrapper | null>(null);
  useEffect(() => {
    // Create WebSocket connection.
    const wsUrl = `${envs.API_SCHEMA === 'https' ? 'wss' : 'ws'}://${
      envs.API_HOST
    }:${envs.API_PORT}/${envs.API_VERSION}/ws`;
    console.log(wsUrl);
    const socket = WebSocketWrapper.getInstance(wsUrl);
    socket.connect(
      () => setWs(socket),
      () => console.log('WebSocket closed')
    );

    return () => {
      ws?.disconnect();
      setWs(null);
    };
  }, []);
  return ws;
};
