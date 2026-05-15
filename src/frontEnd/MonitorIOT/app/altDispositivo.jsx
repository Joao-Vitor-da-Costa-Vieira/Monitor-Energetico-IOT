import { StyleSheet, Text, View } from 'react-native'
import { useLocalSearchParams } from 'expo-router'
import React from 'react'

//componentes
import  SafeView  from '../components/safeView'
import { TextoInputs } from '../components/Inputs'
import buttons from '../components/buttons'

const altDispositivo = () => {
  const { id, title, place } = useLocalSearchParams()

  return (
    <SafeView>
      <View style={{ justifyContent: 'center', alignItems: 'center', paddingTop: 10}}>
        <Text style={{ fontSize: 20, fontWeight: 'bold', paddingBottom: 5 }}>Alterar o Dispositivo</Text>
        <TextoInputs placeholder={title} />
        <TextoInputs placeholder={place || 'Localização do Dispositivo'} />
        {buttons({buttonProps: {onPress: () => console.log('Pressed'), title: 'Alterar'}})}
      </View>
    </SafeView>
  )
}

export default altDispositivo

const styles = StyleSheet.create({})