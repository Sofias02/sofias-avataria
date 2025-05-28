// src/pages/Menu.jsx
import React from 'react';
import { Link } from 'react-router-dom';

export default function Menu() {
  return (
    <div className="min-h-screen p-6 bg-gray-100">
      <h1 className="text-2xl font-bold mb-4">Menú de Usuario</h1>
      <div className="space-y-4">
        <Link to="/catalogo" className="block bg-white p-4 rounded shadow hover:bg-blue-50">🧠 Catálogo de Avatares</Link>
        <Link to="/perfil" className="block bg-white p-4 rounded shadow hover:bg-blue-50">👤 Perfil del Cliente</Link>
        {/* Futuras opciones */}
      </div>
    </div>
  );
}
