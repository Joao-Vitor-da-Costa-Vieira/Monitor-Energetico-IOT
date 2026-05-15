import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

//componentes
import  SafeView  from '../components/safeView'
import { TextoInputs } from '../components/Inputs'
import buttons from '../components/buttons'

const altDispositivo = () => {
  return (
    <SafeView>
      <View style={{ justifyContent: 'center', alignItems: 'center', paddingTop: 10}}>
        <Text style={{ fontSize: 20, fontWeight: 'bold', paddingBottom: 5 }}>Alterar o Dispositivo</Text>
        <TextoInputs placeholder="Nome do Dispositivo" />
        <TextoInputs placeholder="Localização do Dispositivo" />
        {buttons({buttonProps: {onPress: () => console.log('Pressed'), title: 'Alterar'}})}
      </View>
    </SafeView>
  )
}

export default altDispositivo

const styles = StyleSheet.create({})