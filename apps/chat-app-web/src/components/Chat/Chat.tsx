import React, { useEffect, useState } from 'react';
import { useWebsocket } from '../../hooks/useWebsocket';

export function Chat() {
  const [message, setMessage] = useState<string>('');
  const [messages, setMessages] = useState<string[]>([]);

  const ws = useWebsocket();

  useEffect(() => {
    ws?.on('message', (e) => {
      setMessage('');
      setMessages((prev) => [...prev, e.data]);
    });
  }, [ws]);

  function onMessageKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    console.log(e.key);
    if (e.key.toLowerCase() === 'enter') {
      ws?.sendMessage(message);
    }
  }
  function onMessageChange(e: React.ChangeEvent<HTMLInputElement>) {
    setMessage(e.target.value);
  }

  return (
    <div>
      <input
        type="text"
        value={message}
        onChange={onMessageChange}
        onKeyDown={onMessageKeyDown}
      />

      <ul>
        {messages.map((msg, index) => (
          <li key={index}>{msg}</li>
        ))}
      </ul>
      <button>Send Message</button>
    </div>
  );
}
