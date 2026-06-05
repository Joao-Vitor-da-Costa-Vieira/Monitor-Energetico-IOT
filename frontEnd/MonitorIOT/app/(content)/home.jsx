// app/(content)/home.jsx
import { StyleSheet, Text, View, Alert } from 'react-native'
import React, { useState, useEffect, useCallback, useRef } from 'react'
import { router, useFocusEffect } from 'expo-router'

//context
import { useUser } from '../../context/UserContext'
import { useMeasure } from '../../context/MeasureContext'
import { usePlace } from '../../context/PlaceContext'

//componentes
import SafeView from '../../components/safeView'
import Card from '../../components/card'
import Loading from '../../components/loading'
import buttons from '../../components/buttons'

//utils
import { calculateHomeStatsFromAPI } from '../../utils/homeUtils'

const Home = () => {
  const { user, loadUser, logout } = useUser()
  const { measures, loadMeasureUser, isLoading: measuresLoading, clearMeasures } = useMeasure()
  const { places, loadPlaces, isLoading: placesLoading, clearPlaces } = usePlace()
  
  const [lastConsumption, setLastConsumption] = useState(0)
  const [lastConsumptionPlace, setLastConsumptionPlace] = useState('')
  const [lastConsumptionDevice, setLastConsumptionDevice] = useState('')
  const [weeklyAverage, setWeeklyAverage] = useState(0)
  const [highestConsumptionPlace, setHighestConsumptionPlace] = useState('')
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
      const stats = calculateHomeStatsFromAPI(measures, places)
      setLastConsumption(stats.lastConsumption)
      setLastConsumptionPlace(stats.lastMeasurementPlace)
      setLastConsumptionDevice(stats.lastMeasurementDevice)
      setWeeklyAverage(stats.weeklyAverage)
      setHighestConsumptionPlace(stats.highestConsumptionPlace)
    } else if (places.length > 0 && measures.length === 0) {
      setHighestConsumptionPlace(places[0]?.name || 'Nenhum dado')
    }
  }, [measures, places])

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

  if (isFirstLoading) {
    return <Loading />
  }

  return (
    <SafeView>
      <Card style={styles.cardTitle}>
        <Text style={styles.cardContent}>Home</Text>
      </Card>

      <View style={styles.container}>
        <Card style={styles.card}>
          <Text style={styles.cardContent}>Último Consumo Medido</Text>
          <Text style={styles.cardDescription}>{formatPower(lastConsumption)}</Text>
          {lastConsumptionPlace && lastConsumptionPlace !== 'Nenhum local' && (
            <Text style={styles.cardDescription}>📍 {lastConsumptionPlace}</Text>
          )}  
        </Card>
        
        <Card style={styles.card}>
          <Text style={styles.cardContent}>Média de Consumo</Text>
          <Text style={styles.cardDescription}>{formatPower(weeklyAverage)}</Text>
        </Card>
        
        <Card style={styles.card}>
          <Text style={styles.cardContent}>Local com maior consumo</Text>
          <Text style={styles.cardDescription}>{highestConsumptionPlace}</Text>
        </Card>

        <Card style={styles.card}>
          <Text style={styles.cardContent}>Usuário:</Text>
          <Text style={styles.cardDescription}>{user?.name || 'Nome do Usuário'}</Text>
        </Card>

        {buttons({buttonProps: {onPress: handleLogout, title: 'Sair da Sessão'}})}
      </View>
    </SafeView>
  )
}

export default Home

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    card: {
        justifyContent: 'center',
        alignItems: 'center',
        height: 'auto',
        minHeight: 80,
        width: ('90%'),
        marginTop: 20,
        marginBottom: 10,
        padding: 15,
    },
    cardTitle: {
        justifyContent: 'center',
        alignItems: 'center',
        margin: 12.5,
    },
    cardContent: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#fff',
    },
    cardDescription: {
        fontSize: 14,
        color: '#fff',
        marginTop: 5,
    }
})