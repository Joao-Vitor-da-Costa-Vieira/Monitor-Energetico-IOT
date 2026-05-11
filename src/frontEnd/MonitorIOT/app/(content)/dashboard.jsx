import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import { BarChart } from 'react-native-gifted-charts'
import React from 'react'

// componentes
import SafeView from '../../components/safeView'
import Card from '../../components/card'
import buttons, { buttonCancel } from '../../components/buttons'
import DatePickerComponent from '../../components/DataPicker'
import DeviceFilter from '../../components/deviceFilter'

// hooks e utils
import { useDashboard } from '../../hooks/useDashboard'
import { getBarWidth, getSpacing } from '../../utils/chartUtils'

const Dashboard = () => {
  const {
    startDate,
    endDate,
    startDateText,
    endDateText,
    chartData,
    filteredData,
    selectedDevice,
    selectedDeviceInfo,
    measurementType,
    deviceOptions,
    applyFilter,
    clearFilter,
    handleStartDateChange,
    handleEndDateChange,
    handleDeviceChange,
    handleMeasurementTypeChange,
  } = useDashboard()

  const barWidth = getBarWidth(chartData.length)
  const spacing = getSpacing(chartData.length)

  return (
    <SafeView>
      <Card style={styles.cardTitle}>
        <Text style={styles.cardContent}>Dashboard de Energia</Text>
      </Card>
          
      <View style={styles.container}>
        
        {/* Filtro de Dispositivo */}
        <DeviceFilter 
          selectedDevice={selectedDevice}
          onDeviceChange={handleDeviceChange}
          deviceInfo={selectedDeviceInfo}
          deviceOptions={deviceOptions}
        />

        {/* Seletor de Tipo de Medição */}
        <Card style={styles.measurementTypeCard}>
          <Text style={styles.measurementTypeTitle}>Tipo de Medição:</Text>
          <View style={styles.measurementTypeButtons}>
            <TouchableOpacity 
              style={[
                styles.measurementButton,
                measurementType === 'current' && styles.measurementButtonActive
              ]}
              onPress={() => handleMeasurementTypeChange('current')}
            >
              <Text style={[
                styles.measurementButtonText,
                measurementType === 'current' && styles.measurementButtonTextActive
              ]}>
                Corrente (A)
              </Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={[
                styles.measurementButton,
                measurementType === 'power' && styles.measurementButtonActive
              ]}
              onPress={() => handleMeasurementTypeChange('power')}
            >
              <Text style={[
                styles.measurementButtonText,
                measurementType === 'power' && styles.measurementButtonTextActive
              ]}>
                Potência (W)
              </Text>
            </TouchableOpacity>
          </View>
        </Card>

        <DatePickerComponent
          startDate={startDate}
          endDate={endDate}
          onStartDateChange={handleStartDateChange}
          onEndDateChange={handleEndDateChange}
          startDateText={startDateText}
          endDateText={endDateText}
        />

        <View style={styles.buttonContainer}>
          {buttons({buttonProps: {onPress: applyFilter, title: 'Consultar'}})}
        </View>

        <View style={styles.buttonContainer}>
          {buttonCancel({buttonCancelProps: {onPress: clearFilter, title: 'Limpar Filtro'}})}
        </View>

        {/* Resumo dos resultados */}
        {filteredData.length > 0 && (
          <Card style={styles.summaryCard}>
            <Text style={styles.summaryTitle}>📈 Resumo da Análise</Text>
            <Text style={styles.summaryText}>
              Período: {startDateText} a {endDateText}
            </Text>
            <Text style={styles.summaryHighlight}>
              {filteredData.length} registros encontrados
            </Text>
            {filteredData.length > 0 && (
              <Text style={styles.summaryStats}>
                Média: {(filteredData.reduce((sum, item) => sum + item.value, 0) / filteredData.length).toFixed(2)} 
                {measurementType === 'current' ? ' A' : ' W'}
              </Text>
            )}
          </Card>
        )}

        {chartData.length > 0 ? (
          <BarChart
            data={chartData}
            barWidth={barWidth}
            spacing={spacing}
            hideRules={false}
            xAxisThickness={1}
            yAxisThickness={1}
            yAxisTextStyle={{ color: '#666', fontSize: 10 }}
            xAxisLabelTextStyle={{ color: '#666', fontSize: 9 }}
            noOfSections={4}
            maxValue={measurementType === 'current' ? 120 : 20000}
            stepValue={measurementType === 'current' ? 30 : 5000}
            showValuesAsTopLabel={false}
            rotateLabel={true}
            xAxisLabelsVertical={true}
          />
        ) : (
          <Card style={styles.noDataCard}>
            <Text style={styles.noDataText}>
              ⚠️ Nenhum dado encontrado
            </Text>
            <Text style={styles.noDataSubText}>
              {selectedDeviceInfo?.name} - Período selecionado: {startDateText} a {endDateText}
            </Text>
          </Card>
        )}
      </View>
    </SafeView>
  )
}

export default Dashboard

const styles = StyleSheet.create({
  cardTitle: {
    justifyContent: 'center',
    alignItems: 'center',
    margin: 12.5,
  },
  cardContent: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  buttonContainer: {
    width: '90%',
    marginBottom: 10,
  },
  measurementTypeCard: {
    padding: 15,
    marginHorizontal: 20,
    marginBottom: 15,
    width: '90%',
  },
  measurementTypeTitle: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 10,
    color: '#333',
  },
  measurementTypeButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
  },
  measurementButton: {
    flex: 1,
    padding: 10,
    borderRadius: 8,
    backgroundColor: '#f0f0f0',
    alignItems: 'center',
  },
  measurementButtonActive: {
    backgroundColor: '#01cfeb',
  },
  measurementButtonText: {
    fontSize: 14,
    color: '#666',
    fontWeight: '500',
  },
  measurementButtonTextActive: {
    color: '#fff',
  },
  summaryCard: {
    padding: 15,
    marginBottom: 15,
    backgroundColor: '#e8f4f8',
    alignItems: 'center',
    width: '90%',
  },
  summaryTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#007AFF',
    marginBottom: 5,
  },
  summaryText: {
    fontSize: 12,
    color: '#666',
  },
  summaryHighlight: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#28a745',
    marginTop: 5,
  },
  summaryStats: {
    fontSize: 12,
    color: '#007AFF',
    marginTop: 5,
    fontWeight: '500',
  },
  noDataCard: {
    padding: 20,
    backgroundColor: '#fff3cd',
    marginTop: 20,
    alignItems: 'center',
    width: '90%',
  },
  noDataText: {
    color: '#856404',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
  },
  noDataSubText: {
    color: '#856404',
    textAlign: 'center',
    fontSize: 12,
    marginTop: 5,
  }
})