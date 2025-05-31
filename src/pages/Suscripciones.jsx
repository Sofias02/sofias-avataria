import React, { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { AuthContext } from '../context/AuthContext';

export default function Suscripciones() {
  const { t } = useTranslation();
  const { isSubscribed, user } = useContext(AuthContext);

  const handleCheckout = async (priceId) => {
    try {
      const res = await fetch('https://32ae-31-165-198-125.ngrok-free.app/create-checkout-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: user.email, priceId }),
      });
      const data = await res.json();
      window.location.href = data.url;
    } catch (err) {
      console.error('Error al crear sesión de pago:', err);
    }
  };

  const plans = [
    {
      title: 'Plan Gratis',
      price: '0 CHF',
      description: 'Accede a funcionalidades básicas sin memoria ni perfil.',
      active: true,
      disabled: true,
    },
    {
      title: 'Starter',
      price: '18 CHF / mes',
      description: 'Catálogo + Perfil + 2 avatares con memoria.',
      priceId: 'price_1RU9GiBpj4Y6uctzriHsZkY4',
    },
    {
      title: 'Pro',
      price: '28 CHF / mes',
      description: '4 avatares con memoria + 25% descuento en suplementos.',
      priceId: 'price_xxx_pro',
    },
    {
      title: 'Ultra',
      price: '48 CHF / mes',
      description: 'Acceso total + documentos + 150 créditos para llamadas.',
      priceId: 'price_xxx_ultra',
    },
    {
      title: 'Full Access',
      price: '1 CHF / mes',
      description: 'Plan especial: todos los avatares, memoria, llamadas y chat completo.',
      priceId: 'price_1RU9GiBpj4Y6uctzriHsZkY4',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-white flex flex-col items-center justify-center p-8">
      <h2 className="text-4xl font-bold mb-6 text-center">{t('subscriptionPlans')}</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl w-full">
        {plans.map((plan) => (
          <div
            key={plan.title}
            className={`bg-white p-6 rounded-xl shadow-lg border text-center ${
              plan.priceId ? 'border-blue-500' : 'border-gray-300'
            }`}
          >
            <h3 className="text-2xl font-semibold mb-2">{plan.title}</h3>
            <p className="text-gray-600 mb-4">{plan.description}</p>
            <p className="text-3xl font-bold mb-6">{plan.price}</p>
            {plan.disabled || isSubscribed ? (
              <button className="bg-gray-400 text-white px-6 py-2 rounded cursor-not-allowed" disabled>
                {t('active')}
              </button>
            ) : (
              <button
                onClick={() => handleCheckout(plan.priceId)}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded transition"
              >
                {t('subscribeNow')}
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}