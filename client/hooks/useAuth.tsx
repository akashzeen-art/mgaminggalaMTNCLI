import { createContext, useCallback, useContext, useState, type ReactNode } from 'react';

export interface AuthUser {
  msisdn: string;
  actDate: string;
  renewDate: string;
  pricePoint: string;
  validity: string;
  unsubUrl: string;
}

interface LoginOptions {
  openAccount?: boolean;
}

interface AuthContextValue {
  user: AuthUser | null;
  isAuthenticated: boolean;
  showAccount: boolean;
  login: (userData: AuthUser, options?: LoginOptions) => void;
  updateUser: (userData: AuthUser) => void;
  logout: () => void;
  openAccount: () => void;
  closeAccount: () => void;
}

const STORAGE_KEY = 'civ_mtn_auth';

const AuthContext = createContext<AuthContextValue | null>(null);

function readStoredUser(): AuthUser | null {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : null;
  } catch {
    return null;
  }
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(readStoredUser);
  const [showAccount, setShowAccount] = useState(false);

  const persistUser = useCallback((userData: AuthUser) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(userData));
    setUser(userData);
  }, []);

  const login = useCallback((userData: AuthUser, options?: LoginOptions) => {
    persistUser(userData);
    if (options?.openAccount) setShowAccount(true);
  }, [persistUser]);

  const updateUser = useCallback((userData: AuthUser) => {
    persistUser(userData);
  }, [persistUser]);

  const logout = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY);
    setUser(null);
    setShowAccount(false);
  }, []);

  const openAccount = useCallback(() => setShowAccount(true), []);
  const closeAccount = useCallback(() => setShowAccount(false), []);

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        showAccount,
        login,
        updateUser,
        logout,
        openAccount,
        closeAccount,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
}
