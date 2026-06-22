export const calculateHomeStatsFromAPI = (measures, places, activePlace) => {
  console.log('calculateHomeStatsFromAPI chamado');
  console.log('activePlace recebido:', activePlace);
  console.log('places disponíveis:', places);
  
  let activePlaceName = 'Nenhum local selecionado'
  
  // Verifica se activePlace existe
  if (activePlace) {
    console.log('activePlace existe, tipo:', typeof activePlace);
    
    // Caso 1: activePlace é um objeto com placeId
    if (typeof activePlace === 'object' && activePlace !== null) {
      // Verifica se tem placeId
      if (activePlace.placeId) {
        console.log('activePlace.placeId encontrado:', activePlace.placeId);
        // Busca o local pelo placeId na lista de places
        const place = places.find(p => p.id === activePlace.placeId || p.plc_id === activePlace.placeId);
        if (place) {
          activePlaceName = place.name || place.plc_name || 'Local encontrado';
          console.log('Local encontrado pelo placeId:', activePlaceName);
        } else {
          console.log('Nenhum local encontrado com placeId:', activePlace.placeId);
          console.log('Estrutura de places:', places.length > 0 ? Object.keys(places[0]) : 'nenhum place');
        }
      } 
      // Verifica se tem id
      else if (activePlace.id) {
        console.log('activePlace.id encontrado:', activePlace.id);
        const place = places.find(p => p.id === activePlace.id || p.plc_id === activePlace.id);
        if (place) {
          activePlaceName = place.name || place.plc_name || 'Local encontrado';
          console.log('Local encontrado pelo id:', activePlaceName);
        }
      }
      // Verifica se tem name diretamente
      else if (activePlace.name) {
        activePlaceName = activePlace.name;
        console.log('Nome encontrado no objeto activePlace.name:', activePlaceName);
      } else if (activePlace.plc_name) {
        activePlaceName = activePlace.plc_name;
        console.log('Nome encontrado no objeto activePlace.plc_name:', activePlaceName);
      } else {
        console.log('Objeto activePlace não tem propriedade reconhecida');
        console.log('Propriedades do objeto:', Object.keys(activePlace));
        console.log('Objeto completo:', JSON.stringify(activePlace));
        activePlaceName = 'Local ativo (ID: ' + (activePlace.placeId || activePlace.id || 'desconhecido') + ')';
      }
    } 
    // Caso 2: activePlace é um número (ID)
    else if (typeof activePlace === 'number') {
      console.log('activePlace é um número (ID):', activePlace);
      const place = places.find(p => p.id === activePlace || p.plc_id === activePlace);
      if (place) {
        activePlaceName = place.name || place.plc_name || 'Local encontrado';
        console.log('Local encontrado pelo ID:', activePlaceName);
      }
    }
  } else {
    console.log('activePlace é null, undefined ou vazio');
  }

  console.log('activePlaceName final:', activePlaceName);
  
  if (!measures || measures.length === 0) {
    console.log('Nenhuma medida encontrada');
    return {
      lastConsumption: 0,
      lastMeasurementPlace: 'Nenhum local',
      lastMeasurementDevice: 'Nenhum dispositivo',
      weeklyAverage: 0,
      highestConsumptionPlace: 'Nenhum dado',
      activePlaceName: activePlaceName
    }
  }

  // Ordenar medidas por data (mais recente primeiro)
  const sortedMeasures = [...measures].sort((a, b) => {
    const dateA = new Date(a.date)
    const dateB = new Date(b.date)
    return dateB - dateA
  })
  
  const lastMeasurement = sortedMeasures[0]

  // Calcular média de TODAS as medidas
  let weeklyAverage = 0
  if (measures.length > 0) {
    const totalPower = measures.reduce((sum, m) => sum + (m.power || 0), 0)
    weeklyAverage = Math.round(totalPower / measures.length)
  }

  // Encontrar local com maior consumo
  let highestConsumptionPlace = 'Nenhum dado'
  let highestValue = 0

  const highestByPlace = new Map()
  
  measures.forEach(measure => {
    const placeName = measure.place?.name || `Local ${measure.plc_id}`
    const power = measure.power || 0
    
    if (!highestByPlace.has(placeName) || power > highestByPlace.get(placeName)) {
      highestByPlace.set(placeName, power)
    }
    
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
    highestConsumptionPlace: highestConsumptionPlace || 'Nenhum dado',
    activePlaceName: activePlaceName
  }
}