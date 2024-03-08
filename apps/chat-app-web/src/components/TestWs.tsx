import React, { useEffect, useState } from 'react';
import { WebSocketWrapper } from '../utils/websocket';

export function TestWs() {
  const [messages, setMessages] = useState<string[]>([]);
  const [ws, setWs] = useState<WebSocketWrapper | null>(null);

  useEffect(() => {
    // Create WebSocket connection.
    const socket = WebSocketWrapper.getInstance('ws://127.0.0.1:3000/v1/ws');
    socket.connect(
      () => setWs(socket),
      () => console.log('WebSocket closed')
    );
    socket.on('message', (e) => {
      setMessages((prev) => [...prev, e.data]);
    });
    return () => {
      ws?.disconnect();
      setWs(null);
    };
    // Set the WebSocket object in state
  }, []); // Empty array ensures this effect runs only once upon mount

  const sendMessage = () => {
    ws && ws.sendMessage('Another message to the server!');
  };

  return (
    <div>
      <h2>Messages from WebSocket:</h2>
      <ul>
        {messages.map((msg, index) => (
          <li key={index}>{msg}</li>
        ))}
      </ul>
      <button onClick={sendMessage}>Send Message</button>
    </div>
  );
}
