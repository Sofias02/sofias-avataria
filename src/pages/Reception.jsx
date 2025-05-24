import React from 'react';
import { Link } from 'react-router-dom';

const avatars = [
  { name: 'Isabel', img: '/images/isabel.png', path: '/chat/isabel' },
  { name: 'Carlos', img: '/images/carlos.png', path: '/chat/carlos' },
];

export default function Reception() {
  return (
    <div className="min-h-screen bg-cover bg-center" style={{ backgroundImage: "url('/images/oficinas.png')" }}>
      <div className="bg-white/90 p-8 max-w-3xl mx-auto mt-20 rounded-xl shadow-xl text-center">
        <h2 className="text-3xl font-bold mb-6">Elige tu Avatar IA</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {avatars.map((a) => (
            <Link to={a.path} key={a.name} className="hover:scale-105 transition">
              <img src={a.img} alt={a.name} className="rounded-full mx-auto h-40 w-40 object-cover mb-2 shadow-lg" />
              <p className="text-lg font-medium mb-4">{a.name}</p>
            </Link>
          ))}
        </div>
        <Link
          to="/catalogo"
          className="mt-10 inline-block bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
        >
          Suscríbete
        </Link>
      </div>
    </div>
  );
}
