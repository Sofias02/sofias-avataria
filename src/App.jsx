// src/App.jsx
import React, { useContext, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthContext } from './context/AuthContext';

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
import Catalogo from './pages/Catalogo';
import SofiasLLC from './pages/SofiasLLC';
import AdminAvatars from './pages/AdminAvatars'; // 👉 Importación añadida

import { seedAvatars } from './utils/seedAvatars';

export default function App() {
  const { user, isSubscribed, isAdmin, loading } = useContext(AuthContext); // ✅ isAdmin incluido

  useEffect(() => {
    seedAvatars();
  }, []);

  if (loading) return null; // 🔒 Esperar hasta que cargue el estado de autenticación

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

        <Route path="/perfil" element={user ? <Profile /> : <Navigate to="/auth" />} />
        <Route path="/catalogo" element={user ? <Catalogo /> : <Navigate to="/auth" />} />
        <Route path="/suscripciones" element={<Suscripciones />} />
        <Route path="/asi-es-sofias" element={<SofiasLLC />} />

        {/* ✅ Ruta protegida por isAdmin */}
        <Route path="/admin/avatars" element={user && isAdmin ? <AdminAvatars /> : <Navigate to="/inicio" />} />
      </Routes>
    </Router>
  );
}
