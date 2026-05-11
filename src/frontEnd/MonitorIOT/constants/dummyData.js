// constants/dummyData.js

// Classe User (simulada)
export const usersData = [
    { id: 1, name: 'João Silva', email: 'joao@email.com', pass: '123456', active: true },
    { id: 2, name: 'Maria Santos', email: 'maria@email.com', pass: '123456', active: true },
]

// Classe Place (simulada)
export const placesData = [
    { id: 1, name: 'Fábrica São Paulo', usr_id: 1, active: true },
    { id: 2, name: 'Escritório Rio de Janeiro', usr_id: 1, active: true },
    { id: 3, name: 'Loja Belo Horizonte', usr_id: 2, active: true },
]

// Classe Measurement (dados de medição)
export const measurementsData = [
    // Medições para PLC 1 (Dispositivo 1 - Fábrica SP)
    { id: 1, date: new Date(2024, 0, 1), current: 35.2, power: 7840, usr_id: 1, plc_id: 1 },
    { id: 2, date: new Date(2024, 0, 2), current: 42.8, power: 9120, usr_id: 1, plc_id: 1 },
    { id: 3, date: new Date(2024, 0, 3), current: 38.5, power: 8450, usr_id: 1, plc_id: 1 },
    { id: 4, date: new Date(2024, 0, 4), current: 45.3, power: 9780, usr_id: 1, plc_id: 1 },
    { id: 5, date: new Date(2024, 0, 5), current: 50.1, power: 10820, usr_id: 1, plc_id: 1 },
    { id: 6, date: new Date(2024, 0, 6), current: 48.7, power: 10440, usr_id: 1, plc_id: 1 },
    { id: 7, date: new Date(2024, 0, 7), current: 52.3, power: 11280, usr_id: 1, plc_id: 1 },
    { id: 8, date: new Date(2024, 0, 8), current: 55.9, power: 11960, usr_id: 1, plc_id: 1 },
    { id: 9, date: new Date(2024, 0, 9), current: 60.4, power: 12840, usr_id: 1, plc_id: 1 },
    { id: 10, date: new Date(2024, 0, 10), current: 58.2, power: 12480, usr_id: 1, plc_id: 1 },
    { id: 11, date: new Date(2024, 0, 11), current: 62.8, power: 13440, usr_id: 1, plc_id: 1 },
    { id: 12, date: new Date(2024, 0, 12), current: 65.3, power: 13920, usr_id: 1, plc_id: 1 },
    { id: 13, date: new Date(2024, 0, 13), current: 70.1, power: 14880, usr_id: 1, plc_id: 1 },
    { id: 14, date: new Date(2024, 0, 14), current: 68.5, power: 14640, usr_id: 1, plc_id: 1 },
    { id: 15, date: new Date(2024, 0, 15), current: 72.3, power: 15360, usr_id: 1, plc_id: 1 },
    { id: 16, date: new Date(2024, 0, 16), current: 75.8, power: 16080, usr_id: 1, plc_id: 1 },
    { id: 17, date: new Date(2024, 0, 17), current: 78.4, power: 16640, usr_id: 1, plc_id: 1 },
    { id: 18, date: new Date(2024, 0, 18), current: 80.2, power: 17040, usr_id: 1, plc_id: 1 },
    { id: 19, date: new Date(2024, 0, 19), current: 82.9, power: 17600, usr_id: 1, plc_id: 1 },
    { id: 20, date: new Date(2024, 0, 20), current: 85.5, power: 18120, usr_id: 1, plc_id: 1 },

    // Medições para PLC 2 (Dispositivo 2 - Escritório RJ)
    { id: 21, date: new Date(2024, 0, 1), current: 15.2, power: 3840, usr_id: 1, plc_id: 2 },
    { id: 22, date: new Date(2024, 0, 2), current: 18.8, power: 4320, usr_id: 1, plc_id: 2 },
    { id: 23, date: new Date(2024, 0, 3), current: 16.5, power: 3950, usr_id: 1, plc_id: 2 },
    { id: 24, date: new Date(2024, 0, 4), current: 20.3, power: 4680, usr_id: 1, plc_id: 2 },
    { id: 25, date: new Date(2024, 0, 5), current: 22.1, power: 5020, usr_id: 1, plc_id: 2 },
    { id: 26, date: new Date(2024, 0, 6), current: 21.7, power: 4940, usr_id: 1, plc_id: 2 },
    { id: 27, date: new Date(2024, 0, 7), current: 24.3, power: 5480, usr_id: 1, plc_id: 2 },
    { id: 28, date: new Date(2024, 0, 8), current: 25.9, power: 5760, usr_id: 1, plc_id: 2 },
    { id: 29, date: new Date(2024, 0, 9), current: 28.4, power: 6240, usr_id: 1, plc_id: 2 },
    { id: 30, date: new Date(2024, 0, 10), current: 27.2, power: 6080, usr_id: 1, plc_id: 2 },
    { id: 31, date: new Date(2024, 0, 11), current: 30.8, power: 6640, usr_id: 1, plc_id: 2 },
    { id: 32, date: new Date(2024, 0, 12), current: 32.3, power: 6920, usr_id: 1, plc_id: 2 },
    { id: 33, date: new Date(2024, 0, 13), current: 35.1, power: 7480, usr_id: 1, plc_id: 2 },
    { id: 34, date: new Date(2024, 0, 14), current: 33.5, power: 7240, usr_id: 1, plc_id: 2 },
    { id: 35, date: new Date(2024, 0, 15), current: 36.3, power: 7760, usr_id: 1, plc_id: 2 },
    { id: 36, date: new Date(2024, 0, 16), current: 38.8, power: 8180, usr_id: 1, plc_id: 2 },
    { id: 37, date: new Date(2024, 0, 17), current: 40.4, power: 8540, usr_id: 1, plc_id: 2 },
    { id: 38, date: new Date(2024, 0, 18), current: 42.2, power: 8840, usr_id: 1, plc_id: 2 },
    { id: 39, date: new Date(2024, 0, 19), current: 44.9, power: 9300, usr_id: 1, plc_id: 2 },
    { id: 40, date: new Date(2024, 0, 20), current: 46.5, power: 9620, usr_id: 1, plc_id: 2 },

    // Medições para PLC 3 (Dispositivo 3 - Loja BH)
    { id: 41, date: new Date(2024, 0, 1), current: 8.2, power: 1840, usr_id: 2, plc_id: 3 },
    { id: 42, date: new Date(2024, 0, 2), current: 9.8, power: 2120, usr_id: 2, plc_id: 3 },
    { id: 43, date: new Date(2024, 0, 3), current: 8.5, power: 1950, usr_id: 2, plc_id: 3 },
    { id: 44, date: new Date(2024, 0, 4), current: 11.3, power: 2380, usr_id: 2, plc_id: 3 },
    { id: 45, date: new Date(2024, 0, 5), current: 13.1, power: 2720, usr_id: 2, plc_id: 3 },
    { id: 46, date: new Date(2024, 0, 6), current: 12.7, power: 2640, usr_id: 2, plc_id: 3 },
    { id: 47, date: new Date(2024, 0, 7), current: 14.3, power: 2980, usr_id: 2, plc_id: 3 },
    { id: 48, date: new Date(2024, 0, 8), current: 15.9, power: 3260, usr_id: 2, plc_id: 3 },
    { id: 49, date: new Date(2024, 0, 9), current: 18.4, power: 3740, usr_id: 2, plc_id: 3 },
    { id: 50, date: new Date(2024, 0, 10), current: 17.2, power: 3580, usr_id: 2, plc_id: 3 },
]

// Dados organizados por dispositivo (PLC)
export const devicesData = {
    1: {
        id: 1,
        name: 'PLC - Fábrica São Paulo',
        place: placesData[0],
        user: usersData[0],
        measurements: measurementsData.filter(m => m.plc_id === 1),
        color: '#01cfeb',
        icon: '🏭'
    },
    2: {
        id: 2,
        name: 'PLC - Escritório Rio de Janeiro',
        place: placesData[1],
        user: usersData[0],
        measurements: measurementsData.filter(m => m.plc_id === 2),
        color: '#4CAF50',
        icon: '🏢'
    },
    3: {
        id: 3,
        name: 'PLC - Loja Belo Horizonte',
        place: placesData[2],
        user: usersData[1],
        measurements: measurementsData.filter(m => m.plc_id === 3),
        color: '#FF6B6B',
        icon: '🏪'
    }
}

// Opções para o dropdown de dispositivos
export const deviceOptions = Object.values(devicesData).map(device => ({
    label: `${device.icon} ${device.name} (${device.place.name})`,
    value: device.id.toString()
}))

// Dados para o gráfico (valores de corrente ou potência)
export const getDeviceChartData = (deviceId, measurementType = 'current') => {
    const device = devicesData[deviceId]
    if (!device) return []
    
    return device.measurements.map(measurement => ({
        id: measurement.id,
        value: measurementType === 'current' ? measurement.current : measurement.power,
        date: measurement.date,
        current: measurement.current,
        power: measurement.power
    }))
}

// Função auxiliar para converter Date para string (para compatibilidade com o código existente)
export const convertMeasurementsToDailyData = () => {
    const allData = []
    Object.values(devicesData).forEach(device => {
        device.measurements.forEach(measurement => {
            allData.push({
                id: measurement.id,
                value: measurement.current, // ou measurement.power
                date: measurement.date.toISOString().split('T')[0],
                current: measurement.current,
                power: measurement.power,
                device_id: device.id,
                device_name: device.name
            })
        })
    })
    return allData
}