// Archivo: src/pages/Profile.jsx
import React, { useEffect, useState } from 'react';
import { supabase } from '../supabase';
import { useNavigate } from 'react-router-dom';

export default function Profile() {
  const [avatar, setAvatar] = useState(null);
  const [summary, setSummary] = useState('');
  const [userInfo, setUserInfo] = useState({ name: '', description: '', image_url: '' });
  const [conversations, setConversations] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const loadProfile = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return navigate('/auth');

      const { data: profile } = await supabase
        .from('profiles')
        .select('avatar_id, name, description, image_url')
        .eq('id', user.id)
        .single();

      if (!profile) return;

      setUserInfo({
        name: profile.name || '',
        description: profile.description || '',
        image_url: profile.image_url || '',
      });

      if (profile.avatar_id) {
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
      }

      const { data: chats } = await supabase
        .from('chats')
        .select('id, created_at, avatar_name')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      setConversations(chats || []);
    };

    loadProfile();
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserInfo(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    await supabase.from('profiles').update(userInfo).eq('id', user.id);
    alert('Perfil actualizado');
  };

  return (
    <div className="min-h-screen bg-white flex flex-col items-center px-4 py-10">
      <div className="max-w-md w-full bg-gray-100 p-6 rounded-xl shadow-md">
        <h2 className="text-2xl font-bold text-center mb-4">Tu Perfil</h2>
        <div className="flex flex-col items-center">
          <img
            src={userInfo.image_url || 'https://via.placeholder.com/150'}
            alt="User Avatar"
            className="h-32 w-32 rounded-full mb-4 shadow"
          />
          <input
            type="text"
            name="image_url"
            value={userInfo.image_url}
            onChange={handleChange}
            placeholder="URL de tu imagen"
            className="mb-2 p-2 rounded border w-full"
          />
          <input
            type="text"
            name="name"
            value={userInfo.name}
            onChange={handleChange}
            placeholder="Tu nombre"
            className="mb-2 p-2 rounded border w-full"
          />
          <textarea
            name="description"
            value={userInfo.description}
            onChange={handleChange}
            placeholder="Descripción personal"
            className="mb-4 p-2 rounded border w-full"
          />
          <button
            onClick={handleSave}
            className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 mb-4"
          >
            Guardar Cambios
          </button>
          {avatar && (
            <>
              <h3 className="text-xl font-semibold mb-2">Avatar: {avatar.name}</h3>
              <p className="text-gray-600 italic text-center mb-4">{avatar.prompt}</p>
              <div className="w-full mb-6">
                <h4 className="text-lg font-medium mb-1">🧠 Memoria Actual:</h4>
                <p className="bg-white p-3 rounded border border-gray-300 text-sm">{summary || 'Sin memoria aún.'}</p>
              </div>
            </>
          )}
          <h4 className="text-lg font-semibold mb-2">📜 Conversaciones:</h4>
          <ul className="w-full text-sm text-gray-700">
            {conversations.map(chat => (
              <li key={chat.id} className="border-b py-2">
                {chat.avatar_name || 'Avatar'} - {new Date(chat.created_at).toLocaleString()}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}