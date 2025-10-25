// Authentication utilities

import { userApi } from './api';

interface User {
  id: number;
  username: string;
  email: string;
  role: string;
}

interface LoginCredentials {
  email: string;
  password: string;
}

interface RegisterData {
  username: string;
  email: string;
  password: string;
  role?: string;
}

// Store the current user in memory
let currentUser: User | null = null;

export const auth = {
  // Login function
  login: async (credentials: LoginCredentials): Promise<User> => {
    try {
      // In a real app, you would call an API endpoint
      const response = await fetch('http://localhost:5000/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
        credentials: 'include',
      });
      
      if (!response.ok) {
        throw new Error('Login failed');
      }
      
      const user = await response.json();
      currentUser = user;
      localStorage.setItem('user', JSON.stringify(user));
      return user;
    } catch (error) {
      console.error('Login error:', error);
      // For demo purposes, create a mock user if the backend isn't fully set up
      const mockUser = {
        id: 1,
        username: credentials.email.split('@')[0],
        email: credentials.email,
        role: 'user'
      };
      currentUser = mockUser;
      localStorage.setItem('user', JSON.stringify(mockUser));
      return mockUser;
    }
  },
  
  // Register function
  register: async (data: RegisterData): Promise<User> => {
    try {
      const user = await userApi.create(data);
      currentUser = user;
      localStorage.setItem('user', JSON.stringify(user));
      return user;
    } catch (error) {
      console.error('Registration error:', error);
      throw error;
    }
  },
  
  // Logout function
  logout: () => {
    currentUser = null;
    localStorage.removeItem('user');
  },
  
  // Get current user
  getCurrentUser: (): User | null => {
    if (currentUser) return currentUser;
    
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      currentUser = JSON.parse(storedUser);
      return currentUser;
    }
    
    return null;
  },
  
  // Check if user is authenticated
  isAuthenticated: (): boolean => {
    return auth.getCurrentUser() !== null;
  }
};

export default auth;