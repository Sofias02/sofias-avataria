import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Splash from './pages/Splash';
import Home from './pages/Home';
import Reception from './pages/Reception';
import Chat from './pages/Chat';
import Memory from './pages/Memory';
import Auth from './pages/Auth';
import Register from './pages/Register';
import Profile from './pages/Profile'; // NUEVO

import { seedAvatars } from './utils/seedAvatars'; // Asegúrate que el archivo exista

export default function App() {
  useEffect(() => {
    seedAvatars(); // Se ejecuta automáticamente al iniciar la app
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Splash />} />
        <Route path="/inicio" element={<Home />} />
        <Route path="/recepcion" element={<Reception />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="/memoria" element={<Memory />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/register" element={<Register />} />
        <Route path="/perfil" element={<Profile />} /> {/* NUEVO */}
      </Routes>
    </Router>
  );
}
