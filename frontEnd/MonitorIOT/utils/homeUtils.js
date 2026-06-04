export const calculateHomeStatsFromAPI = (measures, places) => {
  
  if (!measures || measures.length === 0) {
    console.log('Nenhuma medida encontrada')
    return {
      lastConsumption: 0,
      lastMeasurementPlace: 'Nenhum local',
      lastMeasurementDevice: 'Nenhum dispositivo',
      weeklyAverage: 0,
      highestConsumptionPlace: 'Nenhum dado'
    }
  }

  // Ordenar medidas por data (mais recente primeiro)
  const sortedMeasures = [...measures].sort((a, b) => {
    const dateA = new Date(a.date)
    const dateB = new Date(b.date)
    return dateB - dateA
  })
  
  const lastMeasurement = sortedMeasures[0]

  // Calcular média de TODAS as medidas (não apenas última semana)
  let weeklyAverage = 0
  if (measures.length > 0) {
    const totalPower = measures.reduce((sum, m) => sum + (m.power || 0), 0)
    weeklyAverage = Math.round(totalPower / measures.length)
  }

  // Encontrar local com maior consumo (baseado em todas as medidas ou na mais recente por local)
  let highestConsumptionPlace = 'Nenhum dado'
  let highestValue = 0

  // Criar um mapa para armazenar o maior consumo de cada local
  const highestByPlace = new Map()
  
  measures.forEach(measure => {
    const placeName = measure.place?.name || `Local ${measure.plc_id}`
    const power = measure.power || 0
    
    if (!highestByPlace.has(placeName) || power > highestByPlace.get(placeName)) {
      highestByPlace.set(placeName, power)
    }
    
    // Também atualiza o maior valor geral
    if (power > highestValue) {
      highestValue = power
      highestConsumptionPlace = placeName
    }
  })

  return {
    lastConsumption: lastMeasurement?.power || 0,
    lastMeasurementPlace: lastMeasurement?.place?.name || 'Nenhum local',
    lastMeasurementDevice: 'Desconhecido',
    weeklyAverage: weeklyAverage,
    highestConsumptionPlace: highestConsumptionPlace || 'Nenhum dado'
  }
}