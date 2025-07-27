import React, { createContext, useContext, useState, type ReactNode } from 'react';
import loginService from '../services/LoginService';

// Interfaces
interface User {
  id: string;
  email: string;
  role: string;
}

interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  loading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  checkAuth: () => Promise<void>;
  clearError: () => void;
}

// Crear el contexto
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Hook personalizado para usar el contexto
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth debe ser usado dentro de un AuthProvider');
  }
  return context;
};

// Props del provider
interface AuthProviderProps {
  children: ReactNode;
}

// Componente provider
export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Función para verificar autenticación
  const checkAuth = async () => {
    try {
      setLoading(true);
      // Aquí haremos la petición al backend para verificar el token
      // Por ahora lo dejamos vacío hasta que implementemos el endpoint
      const response = await loginService.verifyAuth();
      setUser(response.user);
      setIsAuthenticated(true);
      setError(null);
    } catch (error: any) {
      setUser(null);
      setIsAuthenticated(false);
      setError(null); // No mostramos error en verificación automática
    } finally {
      setLoading(false);
    }
  };

  // Función de login
  const login = async (email: string, password: string) => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await loginService.login({ email, password });
      
      // Usar los datos del usuario que vienen en la respuesta del login
      setUser(response.user);
      setIsAuthenticated(true);
      setError(null);
      
    } catch (error: any) {
      setError(error.response?.data?.message || 'Error al iniciar sesión');
      setUser(null);
      setIsAuthenticated(false);
    } finally {
      setLoading(false);
    }
  };

  // Función de logout
  const logout = async () => {
    try {
      setLoading(true);
      await loginService.logout();
    } catch (error) {
      console.error('Error en logout:', error);
    } finally {
      setUser(null);
      setIsAuthenticated(false);
      setError(null);
      setLoading(false);
    }
  };

  // Función para limpiar errores
  const clearError = () => {
    setError(null);
  };


  const value: AuthContextType = {
    isAuthenticated,
    user,
    loading,
    error,
    login,
    logout,
    checkAuth,
    clearError,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};