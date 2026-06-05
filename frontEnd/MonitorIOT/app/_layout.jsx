// app/__layout.jsx
import { StyleSheet } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'

//context
import { UserProvider } from '../context/UserContext'
import { PlaceProvider } from '../context/PlaceContext'
import { MeasureProvider } from '../context/MeasureContext'

const RootLayout = () => {
    return (
        <UserProvider>
            <PlaceProvider>
                <MeasureProvider>
                    <Stack screenOptions={{
                        headerStyle: {backgroundColor: '#01cfeb'},
                        headerTintColor: '#fff',
                        headerTitleStyle: {fontWeight: 'bold'}
                    }}>
                        <Stack.Screen name="index" options={{title: 'Monitor de Energia IOT'}} />
                        <Stack.Screen name="(loginUser)" options={{headerShown: false}} />
                        <Stack.Screen name="(content)" options={{headerShown: false}} />
                        <Stack.Screen name="addLocal" options={{title: 'Adicionar Local'}} />
                        <Stack.Screen name="altLocal" options={{title: 'Editar Local'}} />
                    </Stack>
                </MeasureProvider>
            </PlaceProvider>
        </UserProvider>
    )
}

export default RootLayout

const styles = StyleSheet.create({})