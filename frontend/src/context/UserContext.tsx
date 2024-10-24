import React, { createContext, useContext, ReactNode, useState } from 'react';
import api from '@/utils/api';

interface User {
  id: string;
  username: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  register: (name: string, password: string, phone: string, email: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  const login = async (email: string, password: string) => {
    try {
      const response = await api.post('/api/login', { email, password });
      const { token, usuario } = response.data;
      setUser(usuario);      
      localStorage.setItem('userName', usuario.name);
      localStorage.setItem('userEmail', usuario.email);
      localStorage.setItem('token', token);
      window.location.href = '/';
    } catch (error) {
      console.error('Erro ao fazer requisição de login:', error);
      throw new Error('Não foi possível realizar o login. Verifique suas credenciais.');
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userName');
    localStorage.removeItem('userEmail');
    window.location.href = '/login';
    setUser(null);
  };


  const register = async (name: string, password: string, phone: string, email: string) => {
    try {
      await api.post('/api/register', { name, email, password, phone });
            
      window.location.href = '/login';
    } catch (error) {
      console.error('Erro ao fazer requisição de register:', error);
      throw new Error('Não foi possível realizar o cadastro.');
    }
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, login, logout, register }}>
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