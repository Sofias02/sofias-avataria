// SidebarMenu.jsx
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { AuthContext } from '../context/AuthContext';

export default function SidebarMenu({ open, onClose }) {
  const { user, isAdmin } = useContext(AuthContext); // ✅ Incluimos isAdmin

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          className="fixed top-0 right-0 w-64 h-full bg-white shadow-lg z-50 p-6"
        >
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-600 hover:text-red-500 text-xl"
          >
            &times;
          </button>
          <nav className="mt-12 space-y-4">
            <Link
              to="/perfil"
              className="block px-4 py-2 rounded hover:bg-gray-100 text-lg font-medium"
              onClick={onClose}
            >
              👤 Perfil
            </Link>
            <Link
              to="/catalogo"
              className="block px-4 py-2 rounded hover:bg-gray-100 text-lg font-medium"
              onClick={onClose}
            >
              🧠 Catálogo
            </Link>
            <Link
              to="/suscripciones"
              className="block px-4 py-2 rounded hover:bg-gray-100 text-lg font-medium"
              onClick={onClose}
            >
              💳 Suscripciones
            </Link>
            {isAdmin && (
              <Link
                to="/admin/avatars"
                className="block px-4 py-2 rounded hover:bg-gray-100 text-lg font-medium"
                onClick={onClose}
              >
                🛠️ Panel Avatares
              </Link>
            )}
          </nav>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
