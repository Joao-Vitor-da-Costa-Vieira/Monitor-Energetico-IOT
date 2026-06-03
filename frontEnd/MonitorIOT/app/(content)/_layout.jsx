import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Stack, Tabs } from 'expo-router'
import {Ionicons} from '@expo/vector-icons'

//context
import { UserProvider } from '../../context/UserContext'

const ContentLayout = () => {

    return (

        <UserProvider>
        <Tabs screenOptions={{
            headerShown: false, 
            tabBarActiveBackgroundColor: '#01cfeb', 
            tabBarActiveTintColor: '#fff', 
            tabBarInactiveBackgroundColor: '#01cfeb', 
            tabBarInactiveTintColor: '#888888',
            tabBarStyle: {paddingBottom: 0, paddingTop: 0, height: 90},
            }}>

            <Tabs.Screen name="dispositivo" 
            options={{title: 'Dispositivos', tabBarIcon: ({focused}) => <Ionicons name="wifi" size={20} color={focused ? '#fff' : '#888888'} />}} />
            
            <Tabs.Screen name="home" 
            options={{title: 'Home', tabBarIcon: ({focused}) => <Ionicons name="home" size={20} color={focused ? '#fff' : '#888888'} />}} />
            
            <Tabs.Screen name="dashboard" 
            options={{title: 'Dashboard', tabBarIcon: ({focused}) => <Ionicons name="analytics" size={20} color={focused ? '#fff' : '#888888'} />}} />
        </Tabs>
        </UserProvider>
    )
}

export default ContentLayout

const styles = StyleSheet.create({})