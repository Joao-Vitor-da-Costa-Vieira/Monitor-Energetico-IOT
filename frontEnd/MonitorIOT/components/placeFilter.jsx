import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import Card from './card'
import Dropdown from './dropdown'

const PlaceFilter = ({ selectedPlace, onPlaceChange, deviceInfo, placeOptions }) => {
  return (
    <Card style={styles.card}>
      <Text style={styles.title}>📍 Selecionar Lugar</Text>
      
      <Dropdown
        label="Lugar:"
        options={placeOptions}
        selectedValue={selectedPlace?.id?.toString()}
        onValueChange={onPlaceChange}
        placeholder="Escolha um lugar..."
      />
      
      {deviceInfo && (
        <View style={styles.infoBox}>
          <View style={styles.infoRow}>
            <Text style={styles.infoName}>{deviceInfo.name}</Text>
          </View>
          <Text style={styles.infoDescription}>
            Status: {deviceInfo.active ? 'Ativo' : 'Inativo'}
          </Text>
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
  infoName: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#01cfeb',
  },
  infoDescription: {
    fontSize: 12,
    color: '#666',
    marginTop: 4,
  },
})

export default PlaceFilter