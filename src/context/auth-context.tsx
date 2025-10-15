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
    // If user is logged in and on the login page, redirect them to their dashboard
    if (role && pathname === '/') {
      if (role === 'admin') {
        router.push('/admin/dashboard');
      } else if (role === 'user') {
        router.push('/user/dashboard');
      }
    }
    // If user is not logged in and trying to access a protected route, redirect to login
    else if (!role && pathname !== '/') {
      router.push('/');
    }
  }, [role, pathname, router]);

  const login = (newRole: Role) => {
    setRole(newRole);
    // Redirect logic is now primarily handled by the useEffect hook.
    // This simplifies the login function.
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
