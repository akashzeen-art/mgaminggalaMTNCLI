import { useState, useEffect } from 'react';

export interface AuthUser {
  msisdn: string;
  actDate: string;
  renewDate: string;
  pricePoint: string;
  validity: string;
  unsubUrl: string;
}

const STORAGE_KEY = 'civ_mtn_auth';

export function useAuth() {
  const [user, setUser] = useState<AuthUser | null>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  });

  const login = (userData: AuthUser) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(userData));
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem(STORAGE_KEY);
    setUser(null);
  };

  return { user, login, logout, isAuthenticated: !!user };
}
