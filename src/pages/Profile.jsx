// Archivo: src/pages/Profile.jsx

import React, { useEffect, useState } from 'react';
import { supabase } from '../supabase';
import { useNavigate } from 'react-router-dom';

export default function Profile() {
  const [avatar, setAvatar] = useState(null);
  const [summary, setSummary] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const loadProfile = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return navigate('/auth');

      const { data: profile } = await supabase
        .from('profiles')
        .select('avatar_id')
        .eq('id', user.id)
        .single();

      if (!profile?.avatar_id) return;

      const { data: avatar } = await supabase
        .from('avatars')
        .select('*')
        .eq('id', profile.avatar_id)
        .single();

      setAvatar(avatar);

      const { data: memory } = await supabase
        .from('memory_snapshots')
        .select('summary')
        .eq('user_id', user.id)
        .eq('avatar_id', profile.avatar_id)
        .single();

      if (memory?.summary) setSummary(memory.summary);
    };

    loadProfile();
  }, [navigate]);

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center px-4">
      <div className="max-w-md w-full bg-gray-100 p-6 rounded-xl shadow-md">
        <h2 className="text-2xl font-bold text-center mb-4">Tu Perfil</h2>
        {avatar && (
          <div className="flex flex-col items-center">
            <img src={avatar.image_url} alt={avatar.name} className="h-32 w-32 rounded-full mb-4 shadow" />
            <h3 className="text-xl font-semibold mb-2">Avatar: {avatar.name}</h3>
            <p className="text-gray-600 italic text-center mb-4">{avatar.prompt}</p>
            <div className="w-full">
              <h4 className="text-lg font-medium mb-1">🧠 Memoria Actual:</h4>
              <p className="bg-white p-3 rounded border border-gray-300 text-sm">{summary || 'Sin memoria aún.'}</p>
            </div>
            <button
              onClick={() => navigate('/chat')}
              className="mt-6 bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
            >
              Volver al Chat
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
