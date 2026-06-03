import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'

//context
import { UserProvider } from '../context/UserContext'

const RootLayout = () => {

    return (
        <UserProvider> 

        <Stack screenOptions={{
            headerStyle: {backgroundColor: '#01cfeb'},
            headerTintColor: '#fff',
            headerTitleStyle: {fontWeight: 'bold'}
        }}>
            <Stack.Screen name="index" options={{title: 'Monitor de Energia IOT'}} />
            <Stack.Screen name="(loginUser)" options={{headerShown: false}} />
            <Stack.Screen name="(content)" options={{headerShown: false}} />
            <Stack.Screen name="addDispositivo" options={{title: 'Adicionar Dispositivo'}} />
            <Stack.Screen name="altDispositivo" options={{title: 'Editar Dispositivo'}} />
        </Stack>
        </UserProvider>
    )
}

export default RootLayout

const styles = StyleSheet.create({})