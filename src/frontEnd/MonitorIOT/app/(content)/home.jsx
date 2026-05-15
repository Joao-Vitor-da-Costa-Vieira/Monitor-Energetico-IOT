import { StyleSheet, Text, View } from 'react-native'
import React, { useState, useEffect } from 'react'

//componentes
import SafeView from '../../components/safeView'
import Card from '../../components/card'
import buttons from '../../components/buttons'
import { calculateHomeStats } from '../../utils/homeUtils'

const Home = () => {
  const [lastConsumption, setLastConsumption] = useState(0)
  const [weeklyAverage, setWeeklyAverage] = useState(0)
  const [highestConsumptionPlace, setHighestConsumptionPlace] = useState('')

  useEffect(() => {
    loadStats()
  }, [])

  const loadStats = () => {
    const stats = calculateHomeStats()
    setLastConsumption(stats.lastConsumption)
    setWeeklyAverage(stats.weeklyAverage)
    setHighestConsumptionPlace(stats.highestConsumptionPlace)
  }

  const formatPower = (watts) => {
    if (watts >= 1000) {
      return `${(watts / 1000).toFixed(0)} kWh`
    }
    return `${watts} W`
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
        </Card>
        <Card style={styles.card}>
          <Text style={styles.cardContent}>Média de Consumo da Semana</Text>
          <Text style={styles.cardDescription}>{formatPower(weeklyAverage)}</Text>
        </Card>
        <Card style={styles.card}>
          <Text style={styles.cardContent}>Local com maior consumo</Text>
          <Text style={styles.cardDescription}>{highestConsumptionPlace}</Text>
        </Card>

        {buttons({buttonProps: {onPress: () => console.log('Pressed'), title: 'Sair da Sessão'}})}
      </View>
    </SafeView>
  )
}

export default Home

const styles = StyleSheet.create({
    card: {
        justifyContent: 'center',
        alignItems: 'center',
        height: 80,
        width: ('90%'),
        marginTop: 20,
        marginBottom: 10,
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