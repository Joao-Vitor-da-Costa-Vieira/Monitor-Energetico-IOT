import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import Card from './card'
import Dropdown from './dropdown'
import { deviceOptions } from '../constants/dummyData'

const DeviceFilter = ({  selectedDevice, onDeviceChange, deviceInfo, deviceOptions }) => {
  return (
    <Card style={styles.card}>
      <Text style={styles.title}>📊 Selecionar Dispositivo</Text>
      
      <Dropdown
        label="Dispositivo:"
        options={deviceOptions}
        selectedValue={selectedDevice}
        onValueChange={onDeviceChange}
        placeholder="Escolha um dispositivo..."
      />
      
      {deviceInfo && (
        <View style={styles.infoBox}>
          <View style={styles.infoRow}>
            <Text style={styles.infoName}>{deviceInfo.name}</Text>
          </View>
          <Text style={styles.infoDescription}>{deviceInfo.description}{deviceInfo.place && ` - ${deviceInfo.place.name}`}</Text>
        </View>
      )}
    </Card>
  )
}

const styles = StyleSheet.create({
  card: {
    padding: 15,
    marginHorizontal: 20,
    marginBottom: 15,
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#333',
    textAlign: 'center',
  },
  infoBox: {
    marginTop: 15,
    padding: 12,
    backgroundColor: '#f8f9fa',
    borderRadius: 8,
    borderLeftWidth: 3,
    borderLeftColor: '#01cfeb',
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  infoIcon: {
    fontSize: 18,
    marginRight: 8,
  },
  infoName: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#01cfeb',
  },
  infoDescription: {
    fontSize: 12,
    color: '#666',
  },
})

export default DeviceFilter