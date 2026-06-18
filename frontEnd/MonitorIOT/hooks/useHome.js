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
  const { places, loadPlaces, isLoading: placesLoading, clearPlaces, getActivePlace, activePlace } = usePlace()
  
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

  // Função para carregar dados do usuário
  const loadUserData = async (forceReload = false) => {
    if (!user?.id) return
    
    if (hasLoadedOnce.current && !forceReload) {
      console.log('Home: usando dados em cache')
      return
    }
    
    console.log('Home: carregando dados da API')
    
    try {
      await Promise.all([
        loadPlaces(user.id),
        getActivePlace(),
        loadMeasureUser(user.id)
      ])
      hasLoadedOnce.current = true
    } catch (error) {
      console.error('Erro ao carregar dados:', error)
      Alert.alert('Erro', 'Não foi possível carregar os dados')
    } finally {
      setIsFirstLoading(false)
    }
  }

  useFocusEffect(
    useCallback(() => {
      if (user?.id) {
        if (!hasLoadedOnce.current) {
          loadUserData()
        }
      } else if (!user) {
        loadUser().then(() => {
          if (user?.id && !hasLoadedOnce.current) loadUserData()
        })
      }
      
      return () => {}
    }, [user?.id])
  )

  useEffect(() => {
    if (measures.length > 0) {
      const stats = calculateHomeStatsFromAPI(measures, places, activePlace)
      setLastConsumption(stats.lastConsumption)
      setLastConsumptionPlace(stats.lastMeasurementPlace)
      setLastConsumptionDevice(stats.lastMeasurementDevice)
      setWeeklyAverage(stats.weeklyAverage)
      setHighestConsumptionPlace(stats.highestConsumptionPlace)
      setActivePlaceName(stats.activePlaceName)
    } else if (places.length > 0 && measures.length === 0) {
      setHighestConsumptionPlace(places[0]?.name || 'Nenhum dado')
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
              // Pequeno delay para garantir que o estado foi atualizado
              setTimeout(() => {
                router.replace('/')
              }, 50)
            } catch (error) {
              console.error('Erro ao fazer logout:', error)
              Alert.alert('Erro', 'Não foi possível fazer logout')
            }
          }
        }
      ]
    )
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
    handleLogout
  }
}