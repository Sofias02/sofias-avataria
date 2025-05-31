// src/components/FloatingMenuButton.jsx
import React, { useState } from 'react';
import logo from '/images/logo-sofias.png';
import SidebarMenu from './SidebarMenu';

export default function FloatingMenuButton() {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  return (
    <>
      <div className="fixed bottom-6 right-6 z-50">
        <button
          onClick={toggleSidebar}
          className="bg-white rounded-full p-3 shadow-lg hover:scale-110 transition"
          title="Abrir menú"
        >
          <img src={logo} alt="Menú" className="w-10 h-10" />
        </button>
      </div>

      <SidebarMenu isOpen={isSidebarOpen} onClose={() => setSidebarOpen(false)} />
    </>
  );
}
