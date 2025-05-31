import React, { useEffect, useState, useContext } from 'react';
import { supabase } from '../supabase';
import { AuthContext } from '../context/AuthContext';
import { Navigate } from 'react-router-dom';
import { uploadAvatarImage } from '../utils/uploadImage';

export default function AdminAvatars() {
  const [avatars, setAvatars] = useState([]);
  const [error, setError] = useState('');
  const { user, isAdmin } = useContext(AuthContext);

  useEffect(() => {
    const fetchAvatars = async () => {
      const { data, error } = await supabase.from('avatars').select('*');
      if (error) {
        console.error(error);
        setError('Error al obtener avatares');
      } else {
        setAvatars(data);
      }
    };

    fetchAvatars();
  }, []);

  const handleChange = (id, field, value) => {
    setAvatars(prev =>
      prev.map(avatar => (avatar.id === id ? { ...avatar, [field]: value } : avatar))
    );
  };

  const handleSave = async (avatar) => {
    const { error } = await supabase.from('avatars').update(avatar).eq('id', avatar.id);
    if (error) {
      console.error(error);
      alert('❌ Error al guardar');
    } else {
      alert('✅ Guardado correctamente');
    }
  };

  const handleDelete = async (id) => {
    const { error } = await supabase.from('avatars').delete().eq('id', id);
    if (!error) setAvatars(prev => prev.filter(a => a.id !== id));
  };

  const handleAdd = async () => {
    const { data, error } = await supabase.from('avatars')
      .insert([{ name: '', inmediato: '', prompt: '', image_url: '' }])
      .select('*')
      .single();
    if (!error && data) setAvatars(prev => [...prev, data]);
  };

  const handleFileChange = async (id, file) => {
    try {
      const imageUrl = await uploadAvatarImage(file);
      const updatedAvatars = avatars.map(avatar =>
        avatar.id === id ? { ...avatar, image_url: imageUrl } : avatar
      );
      setAvatars(updatedAvatars);

      const updatedAvatar = updatedAvatars.find(a => a.id === id);
      await handleSave(updatedAvatar);
    } catch (err) {
      alert('❌ Error al subir imagen');
    }
  };

  if (!user || !isAdmin) return <Navigate to="/inicio" />;

  return (
    <div className="min-h-screen p-8 bg-gray-100">
      <h1 className="text-3xl font-bold mb-6">Panel de Avatares</h1>

      {error && <p className="text-red-500">{error}</p>}

      <button
        onClick={handleAdd}
        className="mb-6 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
      >
        ➕ Añadir Avatar
      </button>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {avatars.map(avatar => (
          <div key={avatar.id} className="bg-white p-4 rounded-xl shadow space-y-3">
            <input
              type="text"
              value={avatar.name}
              onChange={(e) => handleChange(avatar.id, 'name', e.target.value)}
              className="w-full border p-2 rounded"
            />
            <input
              type="text"
              value={avatar.inmediato}
              onChange={(e) => handleChange(avatar.id, 'inmediato', e.target.value)}
              className="w-full border p-2 rounded"
            />
            <textarea
              value={avatar.prompt}
              onChange={(e) => handleChange(avatar.id, 'prompt', e.target.value)}
              rows={4}
              className="w-full border p-2 rounded text-sm"
            />
            <input
              type="file"
              accept="image/*"
              onChange={(e) => handleFileChange(avatar.id, e.target.files[0])}
              className="w-full border p-2 rounded"
            />
            <img
              src={avatar.image_url || 'https://via.placeholder.com/150'}
              alt={avatar.name}
              className="w-full h-40 object-cover rounded"
            />
            <div className="flex justify-between">
              <button
                onClick={() => handleSave(avatar)}
                className="bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700"
              >
                Guardar
              </button>
              <button
                onClick={() => handleDelete(avatar.id)}
                className="bg-red-600 text-white px-4 py-1 rounded hover:bg-red-700"
              >
                Eliminar
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
