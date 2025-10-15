
"use client"

import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';

type Role = 'admin' | 'user' | null;

interface AuthContextType {
  role: Role;
  username: string | null;
  isLoading: boolean;
  login: (role: Role, username?: string, rememberMe?: boolean) => void;
  logout: () => void;
  setUsername: (username: string) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [role, setRole] = useState<Role>(null);
  const [username, setUsername] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    // Check localStorage first, then sessionStorage
    let sessionRole = localStorage.getItem('userRole') as Role;
    let sessionUser = localStorage.getItem('username');

    if (!sessionRole || !sessionUser) {
      sessionRole = sessionStorage.getItem('userRole') as Role;
      sessionUser = sessionStorage.getItem('username');
    }
    
    if (sessionRole && sessionUser) {
      setRole(sessionRole);
      setUsername(sessionUser);
    }
    setIsLoading(false);
  }, []);

  const handleSetUsername = (newUsername: string) => {
    setUsername(newUsername);
    const storage = localStorage.getItem('userRole') ? localStorage : sessionStorage;
    storage.setItem('username', newUsername);
  };

  const login = (newRole: Role, name = 'User', rememberMe = false) => {
    setIsLoading(true);
    setRole(newRole);
    const storage = rememberMe ? localStorage : sessionStorage;

    if (newRole === 'admin') {
      setUsername('Admin');
      storage.setItem('userRole', 'admin');
      storage.setItem('username', 'Admin');
      router.push('/admin/dashboard');
    } else if (newRole === 'user') {
      setUsername(name);
      storage.setItem('userRole', 'user');
      storage.setItem('username', name);
      router.push('/user/dashboard');
    }

    // Clear the other storage
    const otherStorage = rememberMe ? sessionStorage : localStorage;
    otherStorage.removeItem('userRole');
    otherStorage.removeItem('username');

    setIsLoading(false);
  };

  const logout = () => {
    setRole(null);
    setUsername(null);
    sessionStorage.removeItem('userRole');
    sessionStorage.removeItem('username');
    localStorage.removeItem('userRole');
    localStorage.removeItem('username');
    router.push('/');
  };

  return (
    <AuthContext.Provider value={{ role, login, logout, username, isLoading, setUsername: handleSetUsername }}>
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
