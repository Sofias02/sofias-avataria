// Archivo: src/pages/Suscripciones.jsx

import React from 'react';

export default function Suscripciones() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-white flex flex-col items-center justify-center p-8">
      <h2 className="text-4xl font-bold mb-6 text-center">Planes de Suscripción</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl w-full">
        <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200 text-center">
          <h3 className="text-2xl font-semibold mb-2">Acceso Básico</h3>
          <p className="text-gray-600 mb-4">Incluye acceso a Isabel y Carlos sin memoria persistente.</p>
          <p className="text-3xl font-bold mb-6">Gratis</p>
          <button className="bg-gray-400 text-white px-6 py-2 rounded cursor-not-allowed">Activo</button>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-lg border border-blue-500 text-center">
          <h3 className="text-2xl font-semibold mb-2">Premium</h3>
          <p className="text-gray-600 mb-4">Accede a todos los avatares con memoria, archivos, voz y funciones exclusivas.</p>
          <p className="text-3xl font-bold mb-6">$9.99 / mes</p>
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded">Suscribirme</button>
        </div>
      </div>
    </div>
  );
}
