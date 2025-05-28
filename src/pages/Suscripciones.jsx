// Archivo: src/pages/Suscripciones.jsx

import React, { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { AuthContext } from '../context/AuthContext';

export default function Suscripciones() {
  const { t } = useTranslation();
  const { isSubscribed, subscribe } = useContext(AuthContext);

  const handleSubscription = () => {
    // Aquí podrías redirigir a Stripe, PayPal o tu pasarela personalizada
    subscribe(); // Lógica temporal: activa el estado simulado de suscripción
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-white flex flex-col items-center justify-center p-8">
      <h2 className="text-4xl font-bold mb-6 text-center">{t('subscriptionPlans')}</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl w-full">
        {/* Plan Gratis */}
        <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200 text-center">
          <h3 className="text-2xl font-semibold mb-2">{t('basicAccess')}</h3>
          <p className="text-gray-600 mb-4">{t('basicDescription')}</p>
          <p className="text-3xl font-bold mb-6">{t('free')}</p>
          <button className="bg-gray-400 text-white px-6 py-2 rounded cursor-not-allowed">{t('active')}</button>
        </div>

        {/* Plan Premium */}
        <div className="bg-white p-6 rounded-xl shadow-lg border border-blue-500 text-center">
          <h3 className="text-2xl font-semibold mb-2">{t('premium')}</h3>
          <p className="text-gray-600 mb-4">{t('premiumDescription')}</p>
          <p className="text-3xl font-bold mb-6">$9.99 / mes</p>
          {isSubscribed ? (
            <button className="bg-green-500 text-white px-6 py-2 rounded cursor-not-allowed">
              {t('active')}
            </button>
          ) : (
            <button onClick={handleSubscription} className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded">
              {t('subscribeNow')}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
