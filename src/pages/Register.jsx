// src/pages/Register.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createClient } from '@supabase/supabase-js';

// 👇 Usa tus propias credenciales de Supabase
const supabase = createClient('https://TU-PROYECTO.supabase.co', 'TU-CLAVE-PUBLICA');

export default function Register() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');
    const { data, error: signUpError } = await supabase.auth.signUp({
      email,
      password,
    });

    if (signUpError) {
      setError(signUpError.message);
    } else {
      const user = data.user;

      // ✅ Crear registro en la tabla profiles (si no tienes trigger en Supabase)
      if (user) {
        await supabase
          .from('profiles')
          .insert([{ id: user.id, email: user.email, is_subscribed: false }]);
      }

      setSuccess(true);
      setTimeout(() => navigate('/auth'), 3000);
    }
  };

  return (
    <div
      className="h-screen w-screen bg-cover bg-center flex items-center justify-center"
      style={{ backgroundImage: "url('/images/auth-bg.png')" }}
    >
      <div className="bg-white/90 backdrop-blur-md p-8 rounded-xl shadow-xl max-w-md w-full text-center">
        <h2 className="text-3xl font-bold mb-4">Crea tu cuenta</h2>
        <p className="mb-6 text-gray-700">Forma parte del universo de AvatarIA</p>

        <form onSubmit={handleRegister} className="space-y-4">
          <input
            type="email"
            placeholder="Correo electrónico"
            className="w-full p-3 rounded-lg border border-gray-300"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Contraseña"
            className="w-full p-3 rounded-lg border border-gray-300"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            type="submit"
            className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition"
          >
            Registrarse
          </button>
        </form>

        {error && <p className="text-red-600 mt-3">{error}</p>}
        {success && <p className="text-green-600 mt-3">Cuenta creada, redirigiendo...</p>}

        <p className="mt-4 text-sm text-gray-600">
          ¿Ya tienes cuenta? <a href="/auth" className="text-blue-600 font-medium hover:underline">Inicia sesión</a>
        </p>
      </div>
    </div>
  );
}
