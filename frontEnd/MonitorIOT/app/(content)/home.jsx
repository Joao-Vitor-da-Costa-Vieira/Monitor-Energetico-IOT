import { StyleSheet, Text, View, Alert } from 'react-native'
import React, { useState, useEffect } from 'react'

//context
import { useUser } from '../../context/UserContext'

//componentes
import SafeView from '../../components/safeView'
import Card from '../../components/card'
import buttons from '../../components/buttons'

//utils
import { calculateHomeStats } from '../../utils/homeUtils'

const Home = () => {
  const { user, logout } = useUser()
  const [lastConsumption, setLastConsumption] = useState(0)
  const [lastConsumptionPlace, setLastConsumptionPlace] = useState('')
  const [lastConsumptionDevice, setLastConsumptionDevice] = useState('')
  const [weeklyAverage, setWeeklyAverage] = useState(0)
  const [highestConsumptionPlace, setHighestConsumptionPlace] = useState('')

  useEffect(() => {
    loadStats()
  }, [])

  const loadStats = () => {
    const stats = calculateHomeStats()
    setLastConsumption(stats.lastConsumption)
    setLastConsumptionPlace(stats.lastMeasurementPlace)
    setLastConsumptionDevice(stats.lastMeasurementDevice)
    setWeeklyAverage(stats.weeklyAverage)
    setHighestConsumptionPlace(stats.highestConsumptionPlace)
  }

  const formatPower = (watts) => {
    if (watts >= 1000) {
      return `${(watts / 1000).toFixed(0)} kWh`
    }
    return `${watts} W`
  }

    const handleLogout = async () => {
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
              await logout()
              router.replace('/index')
            } catch (error) {
              console.error('Erro ao fazer logout:', error)
              Alert.alert('Erro', 'Não foi possível fazer logout')
            }
          }
        }
      ]
    )
  }

  return (
    <SafeView>
      <Card style={styles.cardTitle}>
        <Text style={styles.cardContent}>Home</Text>
      </Card>

      <View style={{justifyContent: 'center', alignItems: 'center'}}>
        <Card style={styles.card}>
          <Text style={styles.cardContent}>Último Consumo Medido</Text>
          <Text style={styles.cardDescription}>{formatPower(lastConsumption)}</Text>
          {lastConsumptionDevice && (
            <Text style={styles.cardDescription}>📱 {lastConsumptionDevice}</Text>
          )}
          {lastConsumptionPlace && (
            <Text style={styles.cardDescription}>📍 {lastConsumptionPlace}</Text>
          )}  
        </Card>
        
        <Card style={styles.card}>
          <Text style={styles.cardContent}>Média de Consumo da Semana</Text>
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
    },
    cardDescription: {
        fontSize: 14,
        color: '#666',
        marginTop: 5,
    }
})