import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'

const LoginUserLayout = () => {

    return (
        <Stack screenOptions={{
            headerStyle: {backgroundColor: '#01cfeb'},
            headerTintColor: '#fff',
            headerTitleStyle: {fontWeight: 'bold'}
        }}>
            <Stack.Screen name="cadastro" options={{title: 'Cadastro'}} />
            <Stack.Screen name="login" options={{title: 'Login'}} />
        </Stack>
    )
}

export default LoginUserLayout

const styles = StyleSheet.create({})