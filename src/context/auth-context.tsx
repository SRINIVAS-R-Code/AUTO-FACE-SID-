"use client"

import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';

type Role = 'admin' | 'user' | null;

interface AuthContextType {
  role: Role;
  login: (role: Role) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [role, setRole] = useState<Role>(null);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    // On initial load, if there's no role but the user is not on the login page,
    // redirect them to the login page.
    if (!role && pathname !== '/') {
      router.push('/');
    } else if (role && pathname === '/') {
      // If user is logged in and on the login page, redirect them to their dashboard
      if (role === 'admin') {
        router.push('/admin/dashboard');
      } else if (role === 'user') {
        router.push('/user/dashboard');
      }
    }
  }, [role, pathname, router]);

  const login = (newRole: Role) => {
    setRole(newRole);
    if (newRole === 'admin') {
      router.push('/admin/dashboard');
    } else if (newRole === 'user') {
      router.push('/user/dashboard');
    }
  };

  const logout = () => {
    setRole(null);
    router.push('/');
  };

  return (
    <AuthContext.Provider value={{ role, login, logout }}>
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
