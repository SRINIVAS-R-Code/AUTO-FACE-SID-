
"use client"

import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';

type Role = 'admin' | 'user' | null;

interface AuthContextType {
  role: Role;
  username: string | null;
  email: string | null;
  avatarUrl: string | null;
  isLoading: boolean;
  login: (role: Role, username?: string, rememberMe?: boolean) => void;
  logout: () => void;
  setUsername: (username: string) => void;
  setAvatarUrl: (avatarUrl: string) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [role, setRole] = useState<Role>(null);
  const [username, setUsername] = useState<string | null>(null);
  const [email, setEmail] = useState<string | null>(null);
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    // Check localStorage first, then sessionStorage
    let sessionRole = localStorage.getItem('userRole') as Role;
    let sessionUser = localStorage.getItem('username');
    let sessionEmail = localStorage.getItem('email');
    let sessionAvatar = localStorage.getItem('avatarUrl');

    if (!sessionRole || !sessionUser) {
      sessionRole = sessionStorage.getItem('userRole') as Role;
      sessionUser = sessionStorage.getItem('username');
      sessionEmail = sessionStorage.getItem('email');
      sessionAvatar = sessionStorage.getItem('avatarUrl');
    }
    
    if (sessionRole && sessionUser && sessionEmail) {
      setRole(sessionRole);
      setUsername(sessionUser);
      setEmail(sessionEmail);
      setAvatarUrl(sessionAvatar || `https://picsum.photos/seed/${sessionUser}/100/100`);
    }
    setIsLoading(false);
  }, []);

  const handleSetUsername = (newUsername: string) => {
    setUsername(newUsername);
    const storage = localStorage.getItem('userRole') ? localStorage : sessionStorage;
    storage.setItem('username', newUsername);
  };
  
  const handleSetAvatarUrl = (newAvatarUrl: string) => {
    setAvatarUrl(newAvatarUrl);
    const storage = localStorage.getItem('userRole') ? localStorage : sessionStorage;
    storage.setItem('avatarUrl', newAvatarUrl);
  };


  const login = (newRole: Role, name = 'User', rememberMe = false) => {
    setIsLoading(true);
    setRole(newRole);
    const storage = rememberMe ? localStorage : sessionStorage;
    const newAvatarUrl = `https://picsum.photos/seed/${name}/100/100`;

    if (newRole === 'admin') {
      const adminName = 'Admin';
      const adminEmail = 'admin@monitorai.com';
      setUsername(adminName);
      setEmail(adminEmail);
      setAvatarUrl(newAvatarUrl);
      storage.setItem('userRole', 'admin');
      storage.setItem('username', adminName);
      storage.setItem('email', adminEmail);
      storage.setItem('avatarUrl', newAvatarUrl);
      router.push('/admin/dashboard');
    } else if (newRole === 'user') {
      const userEmail = `${name.toLowerCase().replace(/\s/g, '.')}@company.com`;
      setUsername(name);
      setEmail(userEmail);
      setAvatarUrl(newAvatarUrl);
      storage.setItem('userRole', 'user');
      storage.setItem('username', name);
      storage.setItem('email', userEmail);
      storage.setItem('avatarUrl', newAvatarUrl);
      router.push('/user/dashboard');
    }

    // Clear the other storage
    const otherStorage = rememberMe ? sessionStorage : localStorage;
    otherStorage.removeItem('userRole');
    otherStorage.removeItem('username');
    otherStorage.removeItem('email');
    otherStorage.removeItem('avatarUrl');

    setIsLoading(false);
  };

  const logout = () => {
    setRole(null);
    setUsername(null);
    setAvatarUrl(null);
    setEmail(null);
    sessionStorage.clear();
    localStorage.clear();
    router.push('/');
  };

  return (
    <AuthContext.Provider value={{ role, login, logout, username, email, avatarUrl, isLoading, setUsername: handleSetUsername, setAvatarUrl: handleSetAvatarUrl }}>
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
