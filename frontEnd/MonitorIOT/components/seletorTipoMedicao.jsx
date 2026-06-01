import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'
import Card from './card'

const MeasurementTypeSelector = ({ measurementType, onMeasurementTypeChange }) => {
  return (
    <Card style={styles.card}>
      <Text style={styles.title}>Tipo de Medição:</Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity 
          style={[
            styles.button,
            measurementType === 'current' && styles.buttonActive
          ]}
          onPress={() => onMeasurementTypeChange('current')}
        >
          <Text style={[
            styles.buttonText,
            measurementType === 'current' && styles.buttonTextActive
          ]}>
            ⚡ Corrente (A)
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[
            styles.button,
            measurementType === 'power' && styles.buttonActive
          ]}
          onPress={() => onMeasurementTypeChange('power')}
        >
          <Text style={[
            styles.buttonText,
            measurementType === 'power' && styles.buttonTextActive
          ]}>
            🔋 Potência (W)
          </Text>
        </TouchableOpacity>
      </View>
    </Card>
  )
}

export default MeasurementTypeSelector

const styles = StyleSheet.create({
  card: {
    padding: 15,
    marginHorizontal: 20,
    marginBottom: 15,
    width: '90%',
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  title: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 12,
    color: '#333',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
  },
  button: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderRadius: 8,
    backgroundColor: '#f5f5f5',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  buttonActive: {
    backgroundColor: '#01cfeb',
    borderColor: '#01cfeb',
    shadowColor: '#01cfeb',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 2,
  },
  buttonText: {
    fontSize: 14,
    color: '#666',
    fontWeight: '500',
  },
  buttonTextActive: {
    color: '#fff',
    fontWeight: '600',
  },
})