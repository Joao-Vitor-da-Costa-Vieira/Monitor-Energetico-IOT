import React, { createContext, useState, useContext } from 'react';
import { Alert } from 'react-native';
import { router } from 'expo-router';
import { API_CONFIG } from '../config/api';

const PlaceContext = createContext({});

export const usePlace = () => {
    const context = useContext(PlaceContext);
    if (!context) {
        throw new Error('usePlace must be used within PlaceProvider');
    }
    return context;
};

export const PlaceProvider = ({ children }) => {
    const [places, setPlaces] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    
    // Função para limpar os lugares (usada no logout)
    const clearPlaces = () => {
        console.log('Limpando lugares do contexto');
        setPlaces([]);
    };
    
    // Função para carregar os lugares do usuário logado
    const loadPlaces = async (usrId) => {
        try {
            setIsLoading(true);
            const response = await fetch(`${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.GET_PLACE_USER}${usrId}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            });
            
            console.log('Resposta GET_PLACE_USER status:', response.status);
            
            if (response.ok) {
                const placesData = await response.json();
                setPlaces(placesData);
            } else {
                console.error('Erro ao carregar lugares:', response.status);
                Alert.alert('Erro', 'Não foi possível carregar os lugares. Por favor, tente novamente.');
            }
        } catch (error) {
            console.error('Erro na requisição de lugares:', error);
            Alert.alert('Erro', 'Ocorreu um erro ao carregar os lugares. Por favor, tente novamente.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <PlaceContext.Provider value={{ places, loadPlaces, clearPlaces, isLoading }}>
            {children}
        </PlaceContext.Provider>
    );
};