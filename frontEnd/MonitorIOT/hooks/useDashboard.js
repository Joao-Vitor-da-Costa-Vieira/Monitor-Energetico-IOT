// hooks/useDashboard.js
import { useState, useEffect } from 'react'
import { devicesData, deviceOptions, getDeviceChartData } from '../constants/dummyData'
import { filterDataByPeriod, getProcessedChartData, formatDate } from '../utils/chartUtils'

export const useDashboard = () => {
  const [startDate, setStartDate] = useState(new Date(2024, 0, 1))
  const [endDate, setEndDate] = useState(new Date(2024, 11, 31))
  const [startDateText, setStartDateText] = useState('01/01/2024')
  const [endDateText, setEndDateText] = useState('31/12/2024')
  const [selectedDevice, setSelectedDevice] = useState('1')
  const [measurementType, setMeasurementType] = useState('current') // 'current' ou 'power'
  const [currentData, setCurrentData] = useState([])

  // Carregar dados do dispositivo selecionado
  useEffect(() => {
    const deviceData = getDeviceChartData(parseInt(selectedDevice), measurementType)
    setCurrentData(deviceData)
  }, [selectedDevice, measurementType])

  // Função para trocar o dispositivo
  const handleDeviceChange = (deviceId) => {
    setSelectedDevice(deviceId)
  }

  // Função para trocar o tipo de medição
  const handleMeasurementTypeChange = (type) => {
    setMeasurementType(type)
  }

  // Função para aplicar o filtro
  const applyFilter = () => {
    const filtered = filterDataByPeriod(currentData, startDate, endDate)
    console.log('Filtro aplicado:', {
      device: selectedDevice,
      deviceName: devicesData[selectedDevice]?.name,
      measurementType,
      start: startDateText,
      end: endDateText,
      itemsCount: filtered.length,
    })
    return filtered
  }

  // Função para limpar o filtro
  const clearFilter = () => {
    setStartDate(new Date(2024, 0, 1))
    setStartDateText('01/01/2024')
    setEndDate(new Date(2024, 11, 31))
    setEndDateText('31/12/2024')
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
  const filteredData = filterDataByPeriod(currentData, startDate, endDate)
  const chartData = getProcessedChartData(filteredData)

  // Informações do dispositivo selecionado
  const selectedDeviceInfo = devicesData[selectedDevice]

  return {
    startDate,
    endDate,
    startDateText,
    endDateText,
    chartData,
    filteredData,
    selectedDevice,
    selectedDeviceInfo,
    measurementType,
    deviceOptions,
    applyFilter,
    clearFilter,
    handleStartDateChange,
    handleEndDateChange,
    handleDeviceChange,
    handleMeasurementTypeChange,
  }
}