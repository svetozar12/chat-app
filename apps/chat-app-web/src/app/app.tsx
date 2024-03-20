import { Chat } from '../components/Chat/Chat';
import React from 'react';
import { Route, Routes, Link } from 'react-router-dom';
import Auth from '../components/Auth/Auth';

export function App() {
  return (
    <Routes>
      <Route path="/" element={<Chat />} />
      <Route path="/auth" element={<Auth />} />
    </Routes>
  );
}

export default App;
