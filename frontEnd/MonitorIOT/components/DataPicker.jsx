import React, { useState } from 'react'
import { StyleSheet, TouchableOpacity, Text, View } from 'react-native'
import DateTimePicker from '@react-native-community/datetimepicker'

const DatePickerComponent = ({ 
  startDate, 
  endDate, 
  onStartDateChange, 
  onEndDateChange,
  startDateText,
  endDateText 
}) => {
  const [showStartPicker, setShowStartPicker] = useState(false)
  const [showEndPicker, setShowEndPicker] = useState(false)

  const handleStartDateChange = (event, selectedDate) => {
    setShowStartPicker(false)
    if (selectedDate) {
      onStartDateChange(selectedDate)
    }
  }

  const handleEndDateChange = (event, selectedDate) => {
    setShowEndPicker(false)
    if (selectedDate) {
      onEndDateChange(selectedDate)
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.filterContainer}>
        <TouchableOpacity 
          style={styles.dateButton}
          onPress={() => setShowStartPicker(true)}>
          <Text style={styles.dateButtonText}>
            Data Inicial: {startDateText}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.dateButton}
          onPress={() => setShowEndPicker(true)}>
          <Text style={styles.dateButtonText}>
            Data Final: {endDateText}
          </Text>
        </TouchableOpacity>
      </View>

      {showStartPicker && (
        <DateTimePicker
          value={startDate}
          mode="date"
          display="default"
          onChange={handleStartDateChange}
        />
      )}

      {showEndPicker && (
        <DateTimePicker
          value={endDate}
          mode="date"
          display="default"
          onChange={handleEndDateChange}
        />
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  filterContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 15,
    gap: 10,
  },
  dateButton: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
  },
  dateButtonText: {
    fontSize: 14,
    color: '#333',
  },
})

export default DatePickerComponent