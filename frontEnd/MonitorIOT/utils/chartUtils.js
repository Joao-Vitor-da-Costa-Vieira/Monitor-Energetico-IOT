// Função para filtrar os dados por período
export const filterDataByPeriod = (data, startDate, endDate) => {
  return data.filter((item) => {
    const itemDate = new Date(item.date)
    const start = new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate())
    const end = new Date(endDate.getFullYear(), endDate.getMonth(), endDate.getDate())
    return itemDate >= start && itemDate <= end
  })
}

// Função para formatar o label (mostrar dia/mês)
export const formatLabel = (dateString) => {
  const date = new Date(dateString)
  return `${date.getDate().toString().padStart(2, '0')}/${(date.getMonth() + 1).toString().padStart(2, '0')}`
}

// Função para processar os dados filtrados para o gráfico
export const getProcessedChartData = (filteredData) => {
  // Ordenar os dados por data
  const sortedData = [...filteredData].sort((a, b) => new Date(a.date) - new Date(b.date))
  
  return sortedData.map((item) => ({
    value: item.value,
    label: formatLabel(item.date),
    frontColor: '#01cfeb',
  }))
}

// Calcular largura da barra baseada na quantidade de dados
export const getBarWidth = (dataLength) => {
  if (dataLength > 20) return 10
  if (dataLength > 10) return 15
  return 25
}

// Calcular espaçamento baseado na quantidade de dados
export const getSpacing = (dataLength) => {
  if (dataLength > 20) return 3
  if (dataLength > 10) return 6
  return 12
}

// Formatar data para exibição (DD/MM/YYYY)
export const formatDate = (date) => {
  return `${date.getDate().toString().padStart(2, '0')}/${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getFullYear()}`
}