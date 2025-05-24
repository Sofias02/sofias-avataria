import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Splash from './pages/Splash';
import Home from './pages/Home';
import Reception from './pages/Reception';
import Chat from './pages/Chat';
import ChatFree from './pages/ChatFree';
import Memory from './pages/Memory';
import Auth from './pages/Auth';
import Register from './pages/Register';
import Profile from './pages/Profile';
import Suscripciones from './pages/Suscripciones';

import { seedAvatars } from './utils/seedAvatars';

export default function App() {
  useEffect(() => {
    seedAvatars();
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Splash />} />
        <Route path="/inicio" element={<Home />} />
        <Route path="/recepcion" element={<Reception />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="/chat/:avatar" element={<ChatFree />} />
        <Route path="/memoria" element={<Memory />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/register" element={<Register />} />
        <Route path="/perfil" element={<Profile />} />
        <Route path="/suscripciones" element={<Suscripciones />} />
      </Routes>
    </Router>
  );
}
