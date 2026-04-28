import { StyleSheet, Text, View, SafeAreaViewBase } from 'react-native'
import React from 'react'

//componentes
import  SafeView  from '../../components/safeView'
import Card from '../../components/card'

const home = () => {

  return (
    <SafeView>
      <Card style={styles.cardTitle}>
        <Text style={styles.cardContent}>Home</Text>
      </Card>

      <View style={{justifyContent: 'center', alignItems: 'center'}}>
        <Card style={styles.card}>
          <Text style={styles.cardContent}>Último Consumo Medido</Text>
          <Text style={styles.cardDescription}>100 kWh</Text>
        </Card>
        <Card style={styles.card}>
          <Text style={styles.cardContent}>Média de Consumo da Semana</Text>
          <Text style={styles.cardDescription}>80 kWh</Text>
        </Card>
        <Card style={styles.card}>
          <Text style={styles.cardContent}>Local com maior consumo</Text>
          <Text style={styles.cardDescription}>Sala de Reuniões</Text>
        </Card>
      </View>
    </SafeView>
  )
}

export default home

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
    }
})