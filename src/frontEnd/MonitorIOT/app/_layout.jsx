import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'

const RootLayout = () => {

    return (
        <Stack screenOptions={{
            headerStyle: {backgroundColor: '#01cfeb'},
            headerTintColor: '#fff',
            headerTitleStyle: {fontWeight: 'bold'}
        }}>
            <Stack.Screen name="index" options={{title: 'Monitor de Energia IOT'}} />
            <Stack.Screen name="cadastro" options={{title: 'Cadastro'}} />
            <Stack.Screen name="Dashboard" options={{title: 'Dashboard'}} />
        </Stack>
    )
}

export default RootLayout

const styles = StyleSheet.create({})