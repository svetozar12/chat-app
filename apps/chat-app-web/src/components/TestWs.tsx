import React, { useEffect, useState } from 'react';
import { ChatWebSocket } from '../utils/websocket';

export function TestWs() {
  const [messages, setMessages] = useState<string[]>([]);
  const [ws, setWs] = useState<WebSocket | null>(null);

  useEffect(() => {
    // Create WebSocket connection.
    const socket = ChatWebSocket.getInstance('ws://localhost:8080/v1/ws');

    // Connection opened
    socket.socket.addEventListener('open', function (event) {
      socket.send('Hello Server!');
    });

    // Listen for messages
    socket.addEventListener('message', function (event) {
      console.log('Message from server ', event.data);
      setMessages((prevMessages) => [...prevMessages, event.data]);
    });

    // Set the WebSocket object in state
    setWs(socket);

    // Clean up on unmount
    return () => {
      socket.close();
    };`
  }, []); // Empty array ensures this effect runs only once upon mount

  const sendMessage = () => {
    if (ws) {
      ws.send('Another message to the server!');
    }
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
