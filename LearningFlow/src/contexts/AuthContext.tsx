'use client';

import { createContext, useContext, useState, ReactNode, useCallback } from 'react';
import { useRouter } from 'next/navigation';

export type Role = 'student' | 'teacher' | 'admin' | null;

type AuthContextType = {
  role: Role;
  login: (role: Role) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [role, setRole] = useState<Role>(null);
  const router = useRouter();

  const login = useCallback((newRole: Role) => {
    if (newRole) {
      setRole(newRole);
      router.push('/dashboard');
    }
  }, [router]);

  const logout = useCallback(() => {
    setRole(null);
    router.push('/');
  }, [router]);

  return (
    <AuthContext.Provider value={{ role, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
