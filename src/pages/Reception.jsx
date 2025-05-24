import React from 'react';
import { Link } from 'react-router-dom';

const avatars = [
  { name: 'Sofía', img: '/images/sofia1.png' },
  { name: 'Isabel', img: '/images/isabel.png' },
  { name: 'Carlos', img: '/images/carlos.png' },
];

export default function Reception() {
  return (
    <div className="min-h-screen bg-cover bg-center" style={{ backgroundImage: "url('/images/oficinas.png')" }}>
      <div className="bg-white/90 p-8 max-w-3xl mx-auto mt-20 rounded-xl shadow-xl text-center">
        <h2 className="text-3xl font-bold mb-6">Elige tu Avatar IA</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {avatars.map((a) => (
            <Link to="/chat" key={a.name} className="hover:scale-105 transition">
              <img src={a.img} alt={a.name} className="rounded-full mx-auto h-40 w-40 object-cover mb-2 shadow-lg" />
              <p className="text-lg font-medium">{a.name}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
