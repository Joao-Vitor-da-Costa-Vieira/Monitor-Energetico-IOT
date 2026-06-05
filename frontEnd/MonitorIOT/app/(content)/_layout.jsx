import { StyleSheet } from 'react-native'
import React, { useEffect, useRef } from 'react'
import { Tabs } from 'expo-router'
import { Ionicons } from '@expo/vector-icons'

//context
import { UserProvider, useUser } from '../../context/UserContext'
import { MeasureProvider, useMeasure } from '../../context/MeasureContext'
import { PlaceProvider, usePlace } from '../../context/PlaceContext'

// Componente interno para registrar os cleanups
const CleanupRegistrar = ({ children }) => {
    const { registerCleanup } = useUser()
    const { clearMeasures } = useMeasure()
    const { clearPlaces } = usePlace()
    
    useEffect(() => {
        // Registrar funções de limpeza
        if (registerCleanup) {
            registerCleanup(() => {
                console.log('Limpando medidas e lugares no logout')
                clearMeasures()
                clearPlaces()
            })
        }
    }, [])
    
    return children
}

const ContentLayout = () => {
    return (
        <UserProvider>
            <MeasureProvider>
                <PlaceProvider>
                    <CleanupRegistrar>
                        <Tabs screenOptions={{
                            headerShown: false, 
                            tabBarActiveBackgroundColor: '#01cfeb', 
                            tabBarActiveTintColor: '#fff', 
                            tabBarInactiveBackgroundColor: '#01cfeb', 
                            tabBarInactiveTintColor: '#888888',
                            tabBarStyle: {paddingBottom: 0, paddingTop: 0, height: 90},
                        }}>
                            <Tabs.Screen 
                                name="dispositivo" 
                                options={{
                                    title: 'Dispositivos', 
                                    tabBarIcon: ({focused}) => 
                                        <Ionicons name="wifi" size={20} color={focused ? '#fff' : '#888888'} />
                                }} 
                            />
                            
                            <Tabs.Screen 
                                name="home" 
                                options={{
                                    title: 'Home', 
                                    tabBarIcon: ({focused}) => 
                                        <Ionicons name="home" size={20} color={focused ? '#fff' : '#888888'} />
                                }} 
                            />
                            
                            <Tabs.Screen 
                                name="dashboard" 
                                options={{
                                    title: 'Dashboard', 
                                    tabBarIcon: ({focused}) => 
                                        <Ionicons name="analytics" size={20} color={focused ? '#fff' : '#888888'} />
                                }} 
                            />
                        </Tabs>
                    </CleanupRegistrar>
                </PlaceProvider>
            </MeasureProvider>
        </UserProvider>
    )
}

export default ContentLayout

const styles = StyleSheet.create({})