import React, { createContext, useState, useContext } from 'react';
import { Alert } from 'react-native';
import { router } from 'expo-router';
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
        const loggedUserData = await response.json();
        console.log('ID do usuário logado:', loggedUserData);
        
        // Verifica se tem usrId (não id)
        if (loggedUserData && loggedUserData.usrId) {
          // Busca os dados completos do usuário usando o usrId
          const userResponse = await fetch(`${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.GET_USER}${loggedUserData.usrId}`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json'
            }
          });
          
          if (userResponse.ok) {
            const completeUserData = await userResponse.json();
            console.log('Dados completos do usuário:', completeUserData);
            
            // Salva os dados do usuário no context
            setUser(completeUserData);
            setIsAuthenticated(true);
            return true;
          } else {
            console.log('Erro ao buscar dados completos do usuário');
            setUser(null);
            setIsAuthenticated(false);
            return false;
          }
        } else {
          console.log('Nenhum usrId encontrado - usuário não está logado');
          setUser(null);
          setIsAuthenticated(false);
          return false;
        }
      } else {
        console.log('Usuário não está logado');
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