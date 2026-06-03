import React, { createContext, useState, useContext, useEffect } from 'react';
import { API_CONFIG } from '../config/api';

const UserContext = createContext({});

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within UserProvider');
  }
  return context;
};

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Função para carregar o usuário logado
  const loadUser = async () => {
    try {
      setIsLoading(true);
      console.log('Buscando usuário logado...');
      
      const response = await fetch(`${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.GET_LOGGED_USER}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      });

      console.log('Resposta GET_LOGGED_USER status:', response.status);

      if (response.ok) {
        const userData = await response.json();
        console.log('Usuário encontrado:', userData);
        setUser(userData);
        setIsAuthenticated(true);
        return true;
      } else {
        console.log('Nenhum usuário logado');
        setUser(null);
        setIsAuthenticated(false);
        return false;
      }
    } catch (error) {
      console.error('Erro ao obter usuário logado:', error);
      setUser(null);
      setIsAuthenticated(false);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  // Função para fazer logout
  const logout = async () => {
    try {
      await fetch(`${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.LOGGOUT_USER}`, {
        method: 'PUT',
        credentials: 'include'
      });
    } catch (error) {
      console.error('Erro ao fazer logout:', error);
    } finally {
      setUser(null);
      setIsAuthenticated(false);
    }
  };

  return (
    <UserContext.Provider value={{
      user,
      isLoading,
      isAuthenticated,
      loadUser,
      logout,
      setUser,
      setIsAuthenticated
    }}>
      {children}
    </UserContext.Provider>
  );
};