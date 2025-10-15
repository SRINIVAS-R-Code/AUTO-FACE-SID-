"use client"

import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { useRouter } from 'next/navigation';

type Role = 'admin' | 'user' | null;

interface AuthContextType {
  role: Role;
  username: string | null;
  login: (role: Role, username?: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [role, setRole] = useState<Role>(null);
  const [username, setUsername] = useState<string | null>(null);
  const router = useRouter();

  const login = (newRole: Role, name = 'User') => {
    setRole(newRole);
    if (newRole === 'admin') {
      setUsername('Admin');
      router.push('/admin/dashboard');
    } else if (newRole === 'user') {
      setUsername(name);
      router.push('/user/dashboard');
    }
  };

  const logout = () => {
    setRole(null);
    setUsername(null);
    router.push('/');
  };

  return (
    <AuthContext.Provider value={{ role, login, logout, username }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
