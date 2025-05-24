import React from 'react';

export default function Home() {
  return (
    <div className="h-screen bg-cover bg-center flex flex-col items-center justify-center" style={{ backgroundImage: "url('/images/edificio.png')" }}>
      <div className="bg-white bg-opacity-80 p-6 rounded-xl shadow-lg text-center">
        <h1 className="text-4xl font-bold mb-4">Bienvenido a Sofia’s — AvatarIA</h1>
        <p className="mb-4 text-lg">Tu red de avatares con alma</p>
        <a href="/chat" className="px-6 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition">Entrar a la Recepción</a>
      </div>
    </div>
  );
}