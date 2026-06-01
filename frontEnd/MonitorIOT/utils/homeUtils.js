// utils/homeUtils.js
import { devicesData } from '../constants/dummyData'

// Função para obter todas as medições de todos os dispositivos
export const getAllMeasurements = () => {
  return Object.values(devicesData).flatMap(device => device.measurements)
}

// Função para obter a última medição com informações do local e dispositivo
export const getLastMeasurement = () => {
  const allMeasurements = []
  
  // Percorre todos os dispositivos e coleta as medições com referência ao dispositivo
  Object.values(devicesData).forEach(device => {
    device.measurements.forEach(measurement => {
      allMeasurements.push({
        ...measurement,
        deviceId: device.id,
        deviceName: device.name,
        placeId: device.place?.id,
        placeName: device.place?.name,
        userName: device.user?.name
      })
    })
  })
  
  // Ordena por data e pega a mais recente
  const lastMeasurement = [...allMeasurements].sort((a, b) => b.date - a.date)[0]
  
  return lastMeasurement || null
}

// Função para calcular a média de consumo da última semana
export const getWeeklyAverageConsumption = () => {
  const allMeasurements = getAllMeasurements()
  const oneWeekAgo = new Date()
  oneWeekAgo.setDate(oneWeekAgo.getDate() - 7)
  
  const lastWeekMeasurements = allMeasurements.filter(m => m.date >= oneWeekAgo)
  
  if (lastWeekMeasurements.length === 0) return 0
  
  const avgPower = lastWeekMeasurements.reduce((sum, m) => sum + m.power, 0) / lastWeekMeasurements.length
  return Math.round(avgPower)
}

// Função para encontrar o local com maior consumo
export const getHighestConsumptionPlace = () => {
  let maxConsumption = { place: '', value: 0 }
  
  Object.values(devicesData).forEach(device => {
    const deviceMeasurements = [...device.measurements].sort((a, b) => b.date - a.date)
    const lastDeviceMeasurement = deviceMeasurements[0]
    
    if (lastDeviceMeasurement && lastDeviceMeasurement.power > maxConsumption.value) {
      maxConsumption = {
        place: device.place?.name || device.name,
        value: lastDeviceMeasurement.power
      }
    }
  })
  
  return maxConsumption.place
}

// Função principal que calcula todas as estatísticas de uma vez
export const calculateHomeStats = () => {
  const lastMeasurement = getLastMeasurement()
  const weeklyAverage = getWeeklyAverageConsumption()
  const highestPlace = getHighestConsumptionPlace()
  
  return {
    lastConsumption: lastMeasurement?.power || 0,
    lastMeasurementDate: lastMeasurement?.date || null,
    lastMeasurementPlace: lastMeasurement?.placeName || 'Nenhum local',
    lastMeasurementDevice: lastMeasurement?.deviceName || 'Nenhum dispositivo',
    lastMeasurementValue: lastMeasurement?.power || 0,
    weeklyAverage: weeklyAverage,
    highestConsumptionPlace: highestPlace || 'Nenhum dado'
  }
}