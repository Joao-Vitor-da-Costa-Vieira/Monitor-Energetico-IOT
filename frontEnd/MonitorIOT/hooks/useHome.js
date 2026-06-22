import { useState, useEffect, useCallback, useRef } from 'react'
import { Alert } from 'react-native'
import { router, useFocusEffect } from 'expo-router'

//context
import { useUser } from '../context/UserContext'
import { useMeasure } from '../context/MeasureContext'
import { usePlace } from '../context/PlaceContext'

//utils
import { calculateHomeStatsFromAPI } from '../utils/homeUtils'

export const useHome = () => {
  const { user, loadUser, logout } = useUser()
  const { measures, loadMeasureUser, isLoading: measuresLoading, clearMeasures } = useMeasure()
  const { places, loadPlaces, isLoading: placesLoading, clearPlaces, getActivePlace, activePlace, clearActivePlace } = usePlace()
  
  const [lastConsumption, setLastConsumption] = useState(0)
  const [lastConsumptionPlace, setLastConsumptionPlace] = useState('')
  const [lastConsumptionDevice, setLastConsumptionDevice] = useState('')
  const [weeklyAverage, setWeeklyAverage] = useState(0)
  const [highestConsumptionPlace, setHighestConsumptionPlace] = useState('')
  const [activePlaceName, setActivePlaceName] = useState('')
  const [isFirstLoading, setIsFirstLoading] = useState(true) 
  const hasLoadedOnce = useRef(false)

  // Carregar usuário inicial
  useEffect(() => {
    const loadInitialUser = async () => {
      if (!user) {
        await loadUser()
      }
    }
    loadInitialUser()
  }, [])

  // Função para atualizar o nome do local ativo
  const updateActivePlaceName = useCallback(() => {
  console.log('updateActivePlaceName chamado');
  console.log('activePlace:', activePlace);
  console.log('places:', places);
  
  if (!activePlace) {
    console.log('activePlace é null, definindo como Nenhum local selecionado');
    setActivePlaceName('Nenhum local selecionado');
    return;
  }

  if (places.length === 0) {
    console.log('places está vazio, aguardando carregamento');
    return;
  }

  let placeName = 'Nenhum local selecionado';
  const placeId = activePlace.placeId || activePlace.id;
  
  if (placeId) {
    console.log('Buscando local com ID:', placeId, 'tipo:', typeof placeId);
    console.log('IDs disponíveis em places:', places.map(p => ({id: p.id, tipo: typeof p.id})));
    
    // Comparação tratando string e número
    const place = places.find(p => {
      // Converte ambos para string para comparação
      const pId = String(p.id || p.plc_id || '');
      const searchId = String(placeId);
      console.log(`Comparando: ${pId} === ${searchId}?`, pId === searchId);
      return pId === searchId;
    });
    
    console.log('Local encontrado:', place);
    
    if (place) {
      placeName = place.name || place.plc_name || 'Local sem nome';
      console.log('Nome do local encontrado:', placeName);
    } else {
      console.log('Nenhum local encontrado com o ID:', placeId);
      // Tenta buscar por nome se tiver
      if (activePlace.name) {
        placeName = activePlace.name;
      } else if (activePlace.plc_name) {
        placeName = activePlace.plc_name;
      }
    }
  } else if (activePlace.name) {
    placeName = activePlace.name;
  } else if (activePlace.plc_name) {
    placeName = activePlace.plc_name;
  }
  
  console.log('Definindo activePlaceName como:', placeName);
  setActivePlaceName(placeName);
}, [activePlace, places]);

  // Função para carregar dados do usuário
  const loadUserData = async (forceReload = false) => {
    const userId = user?.usrId || user?.id
    if (!userId) {
      console.log('Home: usuario nao esta logado')
      return
    }
    
    if (hasLoadedOnce.current && !forceReload) {
      console.log('Home: usando dados em cache')
      return
    }
    
    console.log('Home: carregando dados da API')
    setIsFirstLoading(true)
    
    try {
      await loadPlaces(userId)
      console.log('Places carregados:', places.length)
      
      await getActivePlace()
      console.log('ActivePlace carregado:', activePlace)
      
      await loadMeasureUser(userId)
      console.log('Measures carregados:', measures.length)
      
      hasLoadedOnce.current = true
    } catch (error) {
      console.error('Erro ao carregar dados:', error)
      Alert.alert('Erro', 'Nao foi possivel carregar os dados')
    } finally {
      setIsFirstLoading(false)
    }
  }

  useFocusEffect(
    useCallback(() => {
      const userId = user?.usrId || user?.id
      
      if (userId) {
        if (!hasLoadedOnce.current) {
          loadUserData()
        } else {
          const refreshData = async () => {
            console.log('Atualizando dados ao voltar para home')
            try {
              await getActivePlace()
              await loadMeasureUser(userId)
            } catch (error) {
              console.error('Erro ao atualizar dados:', error)
            }
          }
          refreshData()
        }
      } else if (!user) {
        loadUser().then(() => {
          const newUserId = user?.usrId || user?.id
          if (newUserId && !hasLoadedOnce.current) {
            loadUserData()
          }
        })
      }
      
      return () => {}
    }, [user?.usrId, user?.id])
  )

  // Atualiza o nome do local ativo quando activePlace ou places mudam
  useEffect(() => {
    updateActivePlaceName();
  }, [activePlace, places, updateActivePlaceName]);

  // Calcula as estatísticas quando measures, places ou activePlace mudam
  useEffect(() => {
    console.log('Recalculando estatisticas')
    console.log('Measures:', measures.length)
    console.log('Places:', places.length)
    console.log('ActivePlace:', activePlace)
    
    if (places.length > 0) {
      if (measures.length > 0) {
        const stats = calculateHomeStatsFromAPI(measures, places, activePlace)
        console.log('Estatisticas calculadas:', stats)
        
        setLastConsumption(stats.lastConsumption)
        setLastConsumptionPlace(stats.lastMeasurementPlace)
        setLastConsumptionDevice(stats.lastMeasurementDevice)
        setWeeklyAverage(stats.weeklyAverage)
        setHighestConsumptionPlace(stats.highestConsumptionPlace)
        // Não atualiza activePlaceName aqui porque o outro useEffect já cuida disso
      } else {
        console.log('Sem medidas, definindo valores padrao')
        setLastConsumption(0)
        setLastConsumptionPlace('Nenhum local')
        setLastConsumptionDevice('Nenhum dispositivo')
        setWeeklyAverage(0)
        setHighestConsumptionPlace(places[0]?.name || 'Nenhum dado')
        // activePlaceName é atualizado pelo outro useEffect
      }
    } else {
      console.log('Aguardando places serem carregados...')
    }
  }, [measures, places, activePlace])

  const formatPower = (watts) => {
    if (watts >= 1000) {
      return `${(watts / 1000).toFixed(0)} kWh`
    }
    return `${watts} W`
  }

  const handleLogout = () => {
    Alert.alert(
      'Sair',
      'Tem certeza que deseja sair?',
      [
        { text: 'Cancelar', style: 'cancel' },
        { 
          text: 'Sair', 
          style: 'destructive',
          onPress: async () => {
            try {
              if (clearMeasures) clearMeasures()
              if (clearPlaces) clearPlaces()
              hasLoadedOnce.current = false
              await logout()
              setTimeout(() => {
                router.replace('/')
              }, 50)
            } catch (error) {
              console.error('Erro ao fazer logout:', error)
              Alert.alert('Erro', 'Nao foi possivel fazer logout')
            }
          }
        }
      ]
    )
  }

  const clearMeasurePlace = async () => {
    try {
      await clearActivePlace()
      await loadUserData(true)
    } catch (error) {
      console.error('Erro ao desativar local ativo:', error)
      Alert.alert('Erro', 'Nao foi possivel desativar o local ativo')
    }
  }

  return {
    user,
    lastConsumption,
    lastConsumptionPlace,
    lastConsumptionDevice,
    weeklyAverage,
    highestConsumptionPlace,
    activePlaceName,
    isFirstLoading,
    formatPower,
    handleLogout,
    clearMeasurePlace
  }
}