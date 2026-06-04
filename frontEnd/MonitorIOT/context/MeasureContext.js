import React, { createContext, useState, useContext } from 'react';
import { Alert } from 'react-native';
import { router } from 'expo-router';
import { API_CONFIG } from '../config/api';

const MeasureContext = createContext({});

export const useMeasure = () => {
    const context = useContext(MeasureContext);
    if (!context) {
        throw new Error('useMeasure must be used within MeasureProvider');
    }
    return context;
};

export const MeasureProvider = ({ children }) => {
    const [measures, setMeasures] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    
    // Função para limpar as medidas (usada no logout)
    const clearMeasures = () => {
        console.log('Limpando medidas do contexto');
        setMeasures([]);
    };
    
    // Função para carregar as medidas do lugar selecionado
    const loadMeasureUser = async (usrId) => {
        try {
            setIsLoading(true);
            const response = await fetch(`${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.GET_MEASURE_USER}${usrId}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            });
            
            console.log('Resposta GET_MEASURE_USER status:', response.status);
            
            if (response.ok) {
                const measuresData = await response.json();
                setMeasures(measuresData);
            } else {
                console.error('Erro ao carregar medidas:', response.status);
                Alert.alert('Erro', 'Não foi possível carregar as medidas. Por favor, tente novamente.');
            }
        } catch (error) {
            console.error('Erro na requisição de medidas:', error);
            Alert.alert('Erro', 'Ocorreu um erro ao carregar as medidas. Por favor, tente novamente.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <MeasureContext.Provider value={{ measures, loadMeasureUser, clearMeasures, isLoading }}>
            {children}
        </MeasureContext.Provider>
    );
};