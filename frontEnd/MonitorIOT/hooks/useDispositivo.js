import { useEffect, useState, useRef } from 'react'
import { router } from 'expo-router'

// context
import { usePlace } from '../context/PlaceContext'
import { useMeasure } from '../context/MeasureContext'
import { useUser } from '../context/UserContext'

export const useDispositivo = () => {
  const { places, loadPlaces } = usePlace()
  const { measures, loadMeasureUser } = useMeasure()
  const { user, isLoading: userLoading } = useUser()
  const [placesList, setPlacesList] = useState([])
  const [isRefreshing, setIsRefreshing] = useState(false)
  const hasLoadedData = useRef(false)

  // Função para carregar todos os dados
  const loadAllData = async () => {
    const userId = user?.id
    
    if (userId && !isRefreshing) {
      console.log('Carregando dados do usuário ID:', userId)
      setIsRefreshing(true)
      try {
        await Promise.all([
          loadPlaces(userId),
          loadMeasureUser(userId)
        ])
        console.log('Dados carregados com sucesso')
        hasLoadedData.current = true
      } catch (error) {
        console.error('Erro ao carregar dados:', error)
      } finally {
        setIsRefreshing(false)
      }
    }
  }

  // Carregar dados quando o usuário estiver disponível
  useEffect(() => {
    if (user?.id && !hasLoadedData.current) {
      loadAllData()
    }
  }, [user?.id])

  // Recarregar quando a tela ganhar foco (após adicionar/editar)
  useFocusEffect(
    React.useCallback(() => {
      console.log('Tela Dispositivo em foco')
      if (user?.id && hasLoadedData.current) {
        loadAllData()
      }
      return () => {}
    }, [user?.id])
  )

  useEffect(() => {
    const placesWithMeasures = places.map(place => ({
      ...place,
      measurements: measures.filter(m => m.place?.id === place.id)
    }))
    setPlacesList(placesWithMeasures)
  }, [places, measures])

  const getPlaceStatus = (place) => {
    if (!place.measurements || place.measurements.length === 0) {
      return 'Status: Sem dados'
    }
    
    const lastMeasurement = [...place.measurements].sort((a, b) => new Date(b.date) - new Date(a.date))[0]
    const now = new Date()
    const lastMeasurementDate = new Date(lastMeasurement.date)
    const hoursDiff = (now - lastMeasurementDate) / (1000 * 60 * 60)
    
    if (hoursDiff <= 24) {
      return 'Status: Online'
    } else if (hoursDiff <= 168) {
      return 'Status: Inativo'
    } else {
      return 'Status: Offline'
    }
  }

  const getStatusColor = (status) => {
    if (status.includes('Online')) return '#4CAF50'
    if (status.includes('Inativo')) return '#FF9800'
    return '#F44336'
  }

  return {
    placesList,
    isRefreshing,
    userLoading,
    hasLoadedData,
    user,
    loadAllData,
    getPlaceStatus,
    getStatusColor
  }
}