import React from 'react';
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div
      className="w-screen h-screen bg-no-repeat bg-contain bg-center flex flex-col items-center justify-end text-white relative"
      style={{ backgroundImage: "url('/images/entrada.png')" }}
    >
      <div className="absolute inset-0 bg-black bg-opacity-50 z-0" />
      <div className="relative z-10 mb-10 bg-black bg-opacity-70 px-6 py-4 rounded-xl text-center shadow-xl backdrop-blur-sm max-w-md mx-auto">
        <h1 className="text-3xl font-bold mb-2 tracking-tight leading-tight drop-shadow-lg">
          Avatar<span className="text-blue-400">IA</span>
        </h1>
        <h2 className="text-md font-light mb-4 italic drop-shadow-sm">
          La Red de Avatares con Alma
        </h2>
        <Link
          to="/auth"
          className="px-6 py-2 bg-white text-black text-sm rounded-xl font-semibold hover:bg-gray-200 transition shadow-md"
        >
          Iniciar Experiencia
        </Link>
      </div>
    </div>
  );
}
