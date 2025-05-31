// src/context/AuthContext.jsx
import axios from 'axios';
import React, { createContext, useState, useEffect } from 'react';
import { supabase } from '../supabase';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true); // ✅ Nuevo estado para carga

  useEffect(() => {
    const mockUser = {
      id: '854d7785-4fa8-413e-8b9c-284290d92b10',
      email: 'sofia.rompe.la.ia@gmail.com',
    };
    setUser(mockUser);
  }, []);

  useEffect(() => {
    const fetchProfile = async () => {
      if (user?.id) {
        const { data, error } = await supabase
          .from('profiles')
          .select('is_subscribed, is_admin')
          .eq('id', user.id)
          .single();

        if (data) {
          setIsSubscribed(data.is_subscribed);
          setIsAdmin(data.is_admin);
        } else if (error) {
          console.error('Error al obtener perfil:', error.message);
        }
        setLoading(false);
      }
    };

    fetchProfile();
  }, [user]);

  const subscribe = () => setIsSubscribed(true);
  const unsubscribe = () => setIsSubscribed(false);

  return (
    <AuthContext.Provider value={{ user, isSubscribed, isAdmin, subscribe, unsubscribe, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
