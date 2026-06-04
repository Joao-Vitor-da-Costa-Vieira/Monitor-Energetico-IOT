import { StyleSheet, Text, View, Alert } from 'react-native'
import React, { useState, useEffect, useCallback } from 'react'
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
  // Hooks chamados no topo do componente
  const { user, loadUser, logout } = useUser()
  const { measures, loadMeasureUser, isLoading: measuresLoading, clearMeasures } = useMeasure()
  const { places, loadPlaces, isLoading: placesLoading, clearPlaces } = usePlace()
  
  const [lastConsumption, setLastConsumption] = useState(0)
  const [lastConsumptionPlace, setLastConsumptionPlace] = useState('')
  const [lastConsumptionDevice, setLastConsumptionDevice] = useState('')
  const [weeklyAverage, setWeeklyAverage] = useState(0)
  const [highestConsumptionPlace, setHighestConsumptionPlace] = useState('')
  const [isLoading, setIsLoading] = useState(true)

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
  const loadUserData = async () => {
    if (!user?.id) return
    
    setIsLoading(true)
    try {
      await Promise.all([
        loadPlaces(user.id),
        loadMeasureUser(user.id)
      ])
    } catch (error) {
      console.error('Erro ao carregar dados:', error)
      Alert.alert('Erro', 'Não foi possível carregar os dados')
    } finally {
      setIsLoading(false)
    }
  }

  // useFocusEffect - recarrega dados sempre que a tela ganhar foco
  useFocusEffect(
    useCallback(() => {
      if (user?.id) {
        loadUserData()
      } else if (!user) {
        loadUser().then(() => {
          if (user?.id) loadUserData()
        })
      }
    }, [user?.id])
  )

  // Calcular estatísticas quando medidas ou lugares mudarem
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

  // Função handleLogout corrigida
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
              // Limpar dados dos contexts antes do logout
              if (clearMeasures) clearMeasures()
              if (clearPlaces) clearPlaces()
              
              // Usar o logout do hook
              await logout()
              router.replace('/')
            } catch (error) {
              console.error('Erro ao fazer logout:', error)
              Alert.alert('Erro', 'Não foi possível fazer logout')
            }
          }
        }
      ]
    )
  }

  // Mostrar loading enquanto carrega os dados
  if (isLoading || measuresLoading || placesLoading) {
    return (
        <Loading />
    )
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