// app/(content)/Dispositivo.jsx
import { StyleSheet, Text, View, FlatList } from 'react-native'
import React, { useEffect, useState, useRef } from 'react'
import { router, useFocusEffect } from 'expo-router'

//componentes
import SafeView from '../../components/safeView'
import Card from '../../components/card'
import buttons from '../../components/buttons'
import { buttonOptions } from '../../components/buttons'

// context
import { usePlace } from '../../context/PlaceContext'
import { useMeasure } from '../../context/MeasureContext'
import { useUser } from '../../context/UserContext'
import Loading from '../../components/loading'

const Dispositivo = () => {
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

  // Mostrar loading enquanto carrega o usuário ou os dados iniciais
  if (userLoading || (!hasLoadedData.current && !user?.id)) {
    return (
      <SafeView scrollable={false}>
        <Loading />
      </SafeView>
    )
  }

  // Se não tem usuário após carregamento, redireciona
  if (!user?.id) {
    console.log('Usuário não encontrado, redirecionando para login')
    router.replace('/')
    return null
  }

  return (
    <SafeView scrollable={false}>
      <Card style={styles.cardTitle}>
        <Text style={styles.cardContent}>Locais</Text>
      </Card>

      <View style={styles.buttonContainer}>
        {buttons({buttonProps: {onPress: () => router.push('/addLocal'), title: 'Adicionar Local'}})}
      </View>

      <FlatList 
        data={placesList}
        contentContainerStyle={styles.listContainer}
        renderItem={({item}) => {
          const status = getPlaceStatus(item)
          const statusColor = getStatusColor(status)
          
          return (
            <Card style={styles.card}>
              <View style={styles.cardRow}>
                <View style={styles.cardInfo}>
                  <Text style={styles.cardContent}>{item.name}</Text>
                  <View style={styles.statusContainer}>
                    <Text style={[styles.cardDescription, {color: statusColor}]}>
                      {status}
                    </Text>
                    <Text style={styles.measurementsText}>
                      📊 {item.measurements?.length || 0} medições
                    </Text>
                  </View>
                </View>
                <View style={styles.buttonWrapper}>
                  {buttonOptions({buttonOptionsProps: { 
                    onPress: () => {
                      console.log('Editando local:', item.id, item.name)
                      router.push({ 
                        pathname: '/altLocal', 
                        params: { 
                          id: String(item.id), 
                          title: item.name, 
                          place: item.name 
                        }
                      })
                    }, 
                    title: '...'
                  }})}
                </View>
              </View>
            </Card>
          )
        }}
        keyExtractor={item => item.id.toString()}
        refreshing={isRefreshing}
        onRefresh={loadAllData}
        showsVerticalScrollIndicator={true}
      />
    </SafeView>
  )
}

export default Dispositivo

const styles = StyleSheet.create({
  buttonContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
    width: '100%',
  },
  listContainer: {
    alignItems: 'center',
  },
  card: {
    width: '90%',
    marginVertical: 4,
    padding: 12,
    borderRadius: 10,
    alignSelf: 'center',
  },
  cardTitle: {
    justifyContent: 'center',
    alignItems: 'center',
    margin: 12.5,
    width: '90%',
    alignSelf: 'center',
  },
  cardRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
  cardInfo: {
    flex: 1,
    marginRight: 10,
  },
  cardContent: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  cardDescription: {
    fontSize: 12,
    marginTop: 4,
    fontWeight: '500',
  },
  statusContainer: {
    marginTop: 5,
  },
  measurementsText: {
    fontSize: 11,
    color: '#888',
    marginTop: 2,
  },
  buttonWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
  },
})