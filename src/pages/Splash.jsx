import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Splash() {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/inicio');
    }, 10000); // 10 segundos

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div
      className="w-screen h-screen bg-no-repeat bg-contain bg-center flex items-center justify-center"
      style={{ backgroundImage: "url('/images/home.png')" }}
    >
      {/* Splash con imagen PNG */}
    </div>
  );
}
