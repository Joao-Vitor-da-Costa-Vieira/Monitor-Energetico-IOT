// hooks/useDashboard.js
import { useState, useEffect } from 'react'
import { filterDataByPeriod, getProcessedChartData, formatDate } from '../utils/chartUtils'
import { usePlace } from '../context/PlaceContext'
import { useUser } from '../context/UserContext'
import { API_CONFIG } from '../config/api'

export const useDashboard = () => {
  const { places, loadPlaces } = usePlace()
  const { user } = useUser()
  
  // Data padrão: hoje até 1 ano atrás
  const [startDate, setStartDate] = useState(() => {
    const date = new Date()
    date.setFullYear(date.getFullYear() - 1)
    return date
  })
  const [endDate, setEndDate] = useState(new Date())
  const [startDateText, setStartDateText] = useState('')
  const [endDateText, setEndDateText] = useState('')
  const [selectedPlace, setSelectedPlace] = useState(null)
  const [measurementType, setMeasurementType] = useState('power')
  const [measuresData, setMeasuresData] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  // Inicializar datas padrão
  useEffect(() => {
    setStartDateText(formatDate(startDate))
    setEndDateText(formatDate(endDate))
  }, [])

  // Carregar lugares quando usuário estiver logado
  useEffect(() => {
    const loadUserPlaces = async () => {
      if (user?.id) {
        await loadPlaces(user.id)
      }
    }
    loadUserPlaces()
  }, [user?.id])

  // Selecionar primeiro lugar automaticamente
  useEffect(() => {
    if (places.length > 0 && !selectedPlace) {
      setSelectedPlace(places[0])
    }
  }, [places])

  // Carregar medidas quando lugar ou tipo de medição mudar
  useEffect(() => {
    if (selectedPlace) {
      fetchMeasuresByPlace()
    }
  }, [selectedPlace, measurementType])

  const fetchMeasuresByPlace = async () => {
    if (!selectedPlace) return
    
    try {
      setIsLoading(true)
      const response = await fetch(
        `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.GET_MEASURE_USER}${user?.id}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          }
        }
      )
      
      if (response.ok) {
        const data = await response.json()
        console.log('Dados recebidos:', data)
        
        // Filtrar medidas do lugar selecionado
        const placeMeasures = data.filter(item => item.plc_id === parseInt(selectedPlace.id))
        console.log(`Medidas do lugar ${selectedPlace.name}:`, placeMeasures)
        
        // Processar os dados
        const processedData = placeMeasures.map(item => ({
          date: item.date,
          value: measurementType === 'current' ? item.current : item.power,
        }))
        
        console.log('Dados processados:', processedData)
        setMeasuresData(processedData)
      } else {
        console.error('Erro ao carregar medidas:', response.status)
        setMeasuresData([])
      }
    } catch (error) {
      console.error('Erro na requisição:', error)
      setMeasuresData([])
    } finally {
      setIsLoading(false)
    }
  }

  // Opções para o dropdown de lugares
  const placeOptions = places.map(place => ({
    label: place.name,
    value: place.id.toString(),
  }))

  // Função para trocar o lugar
  const handlePlaceChange = (placeId) => {
    const selected = places.find(p => p.id.toString() === placeId)
    setSelectedPlace(selected)
  }

  // Função para trocar o tipo de medição
  const handleMeasurementTypeChange = (type) => {
    setMeasurementType(type)
  }

  // Função para aplicar o filtro
  const applyFilter = () => {
    console.log('Filtro aplicado')
  }

  // Função para limpar o filtro
  const clearFilter = () => {
    const oneYearAgo = new Date()
    oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1)
    setStartDate(oneYearAgo)
    setStartDateText(formatDate(oneYearAgo))
    setEndDate(new Date())
    setEndDateText(formatDate(new Date()))
  }

  // Manipular mudança de data
  const handleStartDateChange = (selectedDate) => {
    setStartDate(selectedDate)
    setStartDateText(formatDate(selectedDate))
  }

  const handleEndDateChange = (selectedDate) => {
    setEndDate(selectedDate)
    setEndDateText(formatDate(selectedDate))
  }

  // Dados processados para o gráfico
  const filteredData = filterDataByPeriod(measuresData, startDate, endDate)
  const chartData = getProcessedChartData(filteredData)
  
  console.log('Dados filtrados para gráfico:', chartData)
  
  const selectedPlaceInfo = selectedPlace

  return {
    startDate,
    endDate,
    startDateText,
    endDateText,
    chartData,
    filteredData,
    selectedPlace,
    selectedPlaceInfo,
    measurementType,
    placeOptions,
    isLoading,
    applyFilter,
    clearFilter,
    handleStartDateChange,
    handleEndDateChange,
    handlePlaceChange,
    handleMeasurementTypeChange,
  }
}