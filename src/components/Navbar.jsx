// src/components/Navbar.jsx
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Navbar = () => {
  const { user, isSubscribed } = useContext(AuthContext);

  return (
    <nav className="bg-white shadow p-4 flex justify-between">
      <Link to="/" className="text-xl font-bold">Sofia's AvatarIA</Link>
      <div className="space-x-4">
        {user && isSubscribed && (
          <>
            <Link to="/catalogo" className="text-blue-600 hover:underline">Catálogo</Link>
            <Link to="/perfil" className="text-blue-600 hover:underline">Perfil</Link>
          </>
        )}
        {!user && (
          <Link to="/auth" className="text-blue-600 hover:underline">Iniciar Sesión</Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
