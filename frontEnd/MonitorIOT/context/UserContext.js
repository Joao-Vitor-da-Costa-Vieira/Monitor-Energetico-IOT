import React, { createContext, useState, useContext, useEffect } from 'react';
import { Alert } from 'react-native';
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
  const [userLoaded, setUserLoaded] = useState(false);

  // Carregar o usuário automaticamente quando o provider for montado
  useEffect(() => {
    if (!userLoaded) {
      loadUser();
    }
  }, []);

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
        },
        credentials: 'include'
      });

      console.log('Resposta GET_LOGGED_USER status:', response.status);

      if (response.ok) {
        const loggedUserData = await response.json();
        console.log('ID do usuário logado:', loggedUserData);
        
        if (loggedUserData && loggedUserData.usrId) {
          const userResponse = await fetch(`${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.GET_USER}${loggedUserData.usrId}`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json'
            },
            credentials: 'include'
          });
          
          if (userResponse.ok) {
            const completeUserData = await userResponse.json();
            console.log('Dados completos do usuário:', completeUserData);
            
            setUser(completeUserData);
            setIsAuthenticated(true);
            setUserLoaded(true);
            return true;
          }
        }
      }
      
      // Se chegou aqui, não está logado
      setUser(null);
      setIsAuthenticated(false);
      setUserLoaded(true);
      return false;
    } catch (error) {
      console.error('Erro ao obter usuário logado:', error);
      setUser(null);
      setIsAuthenticated(false);
      setUserLoaded(true);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  // Função para fazer logout
  const logout = async () => {
    try {
      console.log('Realizando logout...');
      await fetch(`${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.LOGOUT_USER}`, {
        method: 'PUT',
        credentials: 'include'
      });
      console.log('Logout realizado com sucesso');
    } catch (error) {
      console.error('Erro ao fazer logout:', error);
    } finally {
      setUser(null);
      setIsAuthenticated(false);
      setUserLoaded(false);
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