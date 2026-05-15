import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

//componentes
import  SafeView  from '../components/safeView'
import { TextoInputs } from '../components/Inputs'
import buttons from '../components/buttons'

const addDispositivo = () => {
  return (
    <SafeView>
      <View style={{ justifyContent: 'center', alignItems: 'center', paddingTop: 10}}>
        <Text style={{ fontSize: 20, fontWeight: 'bold', paddingBottom: 5 }}>Adicione o Dispositivo</Text>
        <TextoInputs placeholder="Nome do Dispositivo" />
        <TextoInputs placeholder="Localização do Dispositivo" />
        {buttons({buttonProps: {onPress: () => console.log('Pressed'), title: 'Conectar'}})}
      </View>
    </SafeView>
  )
}

export default addDispositivo

const styles = StyleSheet.create({})