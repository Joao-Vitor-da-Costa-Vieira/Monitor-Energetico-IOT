// utils/homeUtils.js
import { devicesData } from '../constants/dummyData'

// Função para obter todas as medições de todos os dispositivos
export const getAllMeasurements = () => {
  return Object.values(devicesData).flatMap(device => device.measurements)
}

// Função para obter a última medição de todos os dispositivos
export const getLastMeasurement = () => {
  const allMeasurements = getAllMeasurements()
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
    weeklyAverage: weeklyAverage,
    highestConsumptionPlace: highestPlace || 'Nenhum dado'
  }
}