// src/context/AuthContext.jsx
import React, { createContext, useState, useEffect } from 'react';
import { supabase } from '../supabase';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isSubscribed, setIsSubscribed] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);

      if (user) {
        const { data: profile } = await supabase
          .from('profiles')
          .select('is_subscribed')
          .eq('id', user.id)
          .single();

        setIsSubscribed(profile?.is_subscribed);
      }
    };

    fetchUser();
  }, []);

  return (
    <AuthContext.Provider value={{ user, isSubscribed }}>
      {children}
    </AuthContext.Provider>
  );
};
