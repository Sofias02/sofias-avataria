// src/pages/Catalogo.jsx
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../supabase';

export default function Catalogo() {
  const { t } = useTranslation();
  const [avatars, setAvatars] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAvatars = async () => {
      const { data, error } = await supabase.from('avatars').select('*');
      if (!error) setAvatars(data);
    };
    fetchAvatars();
  }, []);

  return (
    <div className="min-h-screen p-10 bg-gradient-to-br from-pink-50 to-purple-100">
      <h1 className="text-4xl font-bold text-center mb-10">{t('catalog.title')}</h1>
      <p className="text-center text-lg max-w-2xl mx-auto mb-6">
        {t('catalog.description')}
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {avatars.map((avatar) => (
          <div
            key={avatar.id}
            className="relative p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition cursor-pointer"
            onClick={() => navigate(`/chat/${avatar.id}`)}
          >
            {avatar.name === 'Sofía CEO' && (
              <span className="absolute top-2 right-2 bg-yellow-400 text-white text-xs px-2 py-1 rounded-full shadow">Premium</span>
            )}
            <img
              src={avatar.image_url || 'https://via.placeholder.com/300x200'}
              alt={avatar.name}
              className="h-40 w-full object-cover rounded mb-4"
            />
            <h2 className="text-xl font-semibold">{avatar.name}</h2>
            <p className="text-sm text-gray-600">{avatar.specialty || t('catalog.soon')}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
