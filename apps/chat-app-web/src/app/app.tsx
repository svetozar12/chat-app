import { Chat } from '../components/Chat/Chat';
import React from 'react';
import { Route, Routes, Link } from 'react-router-dom';
import Auth from '../components/Auth/Auth';
import OpenAPIClientAxios from 'openapi-client-axios';
// import '@chat-app/sdk';
export function App() {
  const api = new OpenAPIClientAxios({
    definition: 'http://localhost:8080/v1/swagger/doc.json',
  });
  async function createPet() {
    const client = await api.getClient();
    console.log(client);
    // const res = await client.
    // console.log('Pet created', res.data);
  }
  return (
    <Routes>
      <Route path="/" element={<Chat />} />
      <Route path="/auth" element={<Auth />} />
    </Routes>
  );
}

export default App;
