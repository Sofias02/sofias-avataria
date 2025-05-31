import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { useTranslation } from 'react-i18next';
import SidebarMenu from '../components/SidebarMenu';

const avatars = [
  { name: 'Isabel', img: '/images/isabel.png', path: '/chat/isabel' },
  { name: 'Carlos', img: '/images/carlos.png', path: '/chat/carlos' },
];

export default function Reception() {
  const { isSubscribed } = useContext(AuthContext);
  const { t, i18n } = useTranslation();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleChangeLanguage = (e) => {
    i18n.changeLanguage(e.target.value);
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center"
      style={{ backgroundImage: "url('/images/oficinas.png')" }}
    >
      {/* Selector de idioma */}
      <div className="absolute top-4 right-4 z-40">
        <select
          onChange={handleChangeLanguage}
          defaultValue={i18n.language}
          className="p-1 rounded border bg-white"
        >
          <option value="es">Español</option>
          <option value="en">English</option>
          <option value="fr">Français</option>
          <option value="de">Deutsch</option>
          <option value="pt">Português</option>
          <option value="it">Italiano</option>
        </select>
      </div>

      {/* Contenido principal */}
      <div className="bg-white/90 p-8 max-w-3xl mx-auto mt-20 rounded-xl shadow-xl text-center">
        <h2 className="text-3xl font-bold mb-6">{t('chooseAvatar')}</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {avatars.map((a) => (
            <Link to={a.path} key={a.name} className="hover:scale-105 transition">
              <img
                src={a.img}
                alt={a.name}
                className="rounded-full mx-auto h-40 w-40 object-cover mb-2 shadow-lg"
              />
              <p className="text-lg font-medium mb-4">{a.name}</p>
            </Link>
          ))}
        </div>

        <div className="flex flex-col items-center gap-4 mt-8">
          <Link
            to="/suscripciones"
            className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
          >
            {t('subscribe')}
          </Link>
          <Link
            to="/asi-es-sofias"
            className="inline-block border border-blue-600 text-blue-600 px-6 py-2 rounded-lg font-medium hover:bg-blue-100 transition"
          >
            {t('SofiasInfo')}
          </Link>
        </div>
      </div>

      {/* Botón flotante con logo para abrir el sidebar */}
      <div className="fixed bottom-6 right-6 z-50">
        <button onClick={() => setSidebarOpen(true)} title="Abrir menú">
          <img
            src="/images/logo-sofias.png"
            alt="Menú"
            className="h-16 w-16 rounded-full shadow-lg hover:scale-110 transition-transform"
          />
        </button>
      </div>

      {/* Sidebar lateral */}
      <SidebarMenu open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
    </div>
  );
}
