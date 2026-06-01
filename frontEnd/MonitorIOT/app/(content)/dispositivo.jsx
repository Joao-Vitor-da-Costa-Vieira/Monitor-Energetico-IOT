import { StyleSheet, Text, View, FlatList } from 'react-native'
import React from 'react'
import { router } from 'expo-router'

//componentes
import SafeView from '../../components/safeView'
import Card from '../../components/card'
import buttons from '../../components/buttons'
import { buttonCancel, buttonOptions } from '../../components/buttons'

// dados
import { devicesData } from '../../constants/dummyData'

const Dispositivo = () => {
  // Converter o objeto devicesData em array para o FlatList
  const devicesList = Object.values(devicesData)

  // Função para determinar o status do dispositivo baseado na última medição
  const getDeviceStatus = (device) => {
    if (!device.measurements || device.measurements.length === 0) {
      return 'Status: Sem dados'
    }
    
    const lastMeasurement = [...device.measurements].sort((a, b) => b.date - a.date)[0]
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

  // Função para obter a cor do status
  const getStatusColor = (status) => {
    if (status.includes('Online')) return '#4CAF50'
    if (status.includes('Inativo')) return '#FF9800'
    return '#F44336'
  }

  return (
    <SafeView>
      <Card style={styles.cardTitle}>
        <Text style={styles.cardContent}>Dispositivos</Text>
      </Card>

      <View style={{justifyContent: 'center', alignItems: 'center', marginBottom: 10}}>
        {buttons({buttonProps: {onPress: () => router.push('/addDispositivo'), title: 'Adicionar Dispositivo'}})}
      </View>

      <View style={{justifyContent: 'center', alignItems: 'center'}}>
        <FlatList 
          data={devicesList}
          renderItem={({item}) => {
            const status = getDeviceStatus(item)
            const statusColor = getStatusColor(status)
            
            return (
              <Card style={styles.card}>
                <View style={{flexDirection: 'row', justifyContent: 'space-between', width: '100%'}}>
                  <View style={{flex: 1}}>
                    <View style={{flexDirection: 'row', alignItems: 'center', gap: 8}}>
                      <Text style={styles.cardContent}>{item.name}</Text>
                    </View>
                    <View style={{marginTop: 5}}>
                      <Text style={[styles.cardDescription, {color: statusColor}]}>
                        {status}
                      </Text>
                      <Text style={styles.locationText}>
                         {item.place?.name || 'Local não definido'}
                      </Text>
                      <Text style={styles.measurementsText}>
                        📊 {item.measurements?.length || 0} medições
                      </Text>
                    </View>
                  </View>
                  <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', gap: 5}}>
                    {buttonOptions({buttonOptionsProps: {onPress: () => router.push({ pathname: '/altDispositivo', params: { id: item.id, title: item.name, place: item.place.name } }), title: '...'}})}
                    {buttonCancel({buttonCancelProps: {onPress: () => console.log('Excluir', item.id), title: 'X'}})}
                  </View>
                </View>
              </Card>
            )
          }}
          contentContainerStyle={{
            paddingBottom: 245, 
          }}
          keyExtractor={item => item.id.toString()}
        />
      </View>
    </SafeView>
  )
}

export default Dispositivo

const styles = StyleSheet.create({
  card: {
    width: 350,
    margin: 2,
    height: 110,
    padding: 10,
  },    
  cardTitle: {
    justifyContent: 'center',
    alignItems: 'center',
    margin: 12.5,
  },
  cardContent: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  cardDescription: {
    fontSize: 12,
    marginTop: 2,
    fontWeight: '500',
  },
  deviceIcon: {
    fontSize: 24,
  },
  locationText: {
    fontSize: 11,
    color: '#666',
    marginTop: 2,
  },
  measurementsText: {
    fontSize: 11,
    color: '#888',
    marginTop: 2,
  },
})