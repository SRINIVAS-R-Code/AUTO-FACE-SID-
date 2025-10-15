"use client"

import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';

type Role = 'admin' | 'user' | null;

interface AuthContextType {
  role: Role;
  username: string | null;
  isLoading: boolean;
  login: (role: Role, username?: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [role, setRole] = useState<Role>(null);
  const [username, setUsername] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    // Simulate checking for a persisted session
    const sessionRole = sessionStorage.getItem('userRole') as Role;
    const sessionUser = sessionStorage.getItem('username');
    if (sessionRole && sessionUser) {
      setRole(sessionRole);
      setUsername(sessionUser);
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    if (!isLoading) {
      if (role) {
        sessionStorage.setItem('userRole', role);
        if (username) sessionStorage.setItem('username', username);
      } else {
        sessionStorage.removeItem('userRole');
        sessionStorage.removeItem('username');
      }
    }
  }, [role, username, isLoading]);

  useEffect(() => {
    // When loading is finished and role is determined, stop showing loader on layouts
    if (!isLoading) {
      // This is a bit of a hack to force re-render on layouts after loading
    }
  }, [isLoading])


  const login = (newRole: Role, name = 'User') => {
    setIsLoading(true);
    setRole(newRole);
    if (newRole === 'admin') {
      setUsername('Admin');
      router.push('/admin/dashboard');
    } else if (newRole === 'user') {
      setUsername(name);
      router.push('/user/dashboard');
    }
    // Set a timeout to simulate loading and allow destination page to mount
    setTimeout(() => setIsLoading(false), 500); 
  };

  const logout = () => {
    setRole(null);
    setUsername(null);
    router.push('/');
  };

  return (
    <AuthContext.Provider value={{ role, login, logout, username, isLoading }}>
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
