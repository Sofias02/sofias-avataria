// src/components/FloatingMenuButton.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function FloatingMenuButton() {
  const navigate = useNavigate();

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <button
        onClick={() => navigate('/menu')}
        className="bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-700 transition"
        title="Abrir menú"
      >
        <img src="/logo.svg" alt="Menú" className="w-6 h-6" />
      </button>
    </div>
  );
}
