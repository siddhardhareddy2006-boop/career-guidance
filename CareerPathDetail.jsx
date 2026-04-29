import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import api, { setAuthToken } from '../api';

const AuthContext = createContext(null);

const STORAGE_KEY = 'careerguide_token';

export function AuthProvider({ children }) {
  const [token, setTokenState] = useState(() => localStorage.getItem(STORAGE_KEY));
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(!!token);

  const setToken = useCallback((t) => {
    if (t) {
      localStorage.setItem(STORAGE_KEY, t);
      setAuthToken(t);
      setTokenState(t);
    } else {
      localStorage.removeItem(STORAGE_KEY);
      setAuthToken(null);
      setTokenState(null);
      setUser(null);
    }
  }, []);

  useEffect(() => {
    setAuthToken(token);
    if (!token) {
      setLoading(false);
      return;
    }
    let cancelled = false;
    (async () => {
      try {
        const { data } = await api.get('/auth/me');
        if (!cancelled) setUser(data);
      } catch {
        if (!cancelled) setToken(null);
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [token, setToken]);

  const login = useCallback(
    async (email, password) => {
      const { data } = await api.post('/auth/login', { email, password });
      setToken(data.token);
      const { data: me } = await api.get('/auth/me');
      setUser(me);
      return me;
    },
    [setToken]
  );

  const register = useCallback(
    async (payload) => {
      const { data } = await api.post('/auth/register', payload);
      setToken(data.token);
      const { data: me } = await api.get('/auth/me');
      setUser(me);
      return me;
    },
    [setToken]
  );

  const logout = useCallback(() => setToken(null), [setToken]);

  const refreshUser = useCallback(async () => {
    if (!token) return;
    const { data } = await api.get('/auth/me');
    setUser(data);
    return data;
  }, [token]);

  const value = useMemo(
    () => ({
      token,
      user,
      loading,
      login,
      register,
      logout,
      refreshUser,
      isAdmin: user?.role === 'admin',
      isCounselor: user?.role === 'counselor',
      isStudent: user?.role === 'student',
    }),
    [token, user, loading, login, register, logout, refreshUser]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
