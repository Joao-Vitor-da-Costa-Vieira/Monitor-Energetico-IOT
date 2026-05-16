import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'

//componentes
import  SafeView  from '../components/safeView'
import { TextoInputs } from '../components/Inputs'
import buttons from '../components/buttons'

//utils
import { validateTextInput } from '../utils/validationInputUtils'

const addDispositivo = () => {

  const[nome, setNome] = useState('')
  const[localizacao, setLocalizacao] = useState('')

  const handleAdicionar = () => {

    // Valida nome do dispositivo
    const nomeValidation = validateTextInput(nome)
    if (!nomeValidation.isValid) {
      alert(nomeValidation.message)
      return
    }
    // Valida localização do dispositivo
    const localizacaoValidation = validateTextInput(localizacao)
    if (!localizacaoValidation.isValid) {
      alert(localizacaoValidation.message)
      return
    }
    console.log('Dispositivo adicionado')
  }

  return (
    <SafeView>
      <View style={{ justifyContent: 'center', alignItems: 'center', paddingTop: 10}}>
        <Text style={{ fontSize: 20, fontWeight: 'bold', paddingBottom: 5 }}>Adicione o Dispositivo</Text>
        <TextoInputs placeholder="Nome do Dispositivo" value={nome} onChangeText={setNome} />
        <TextoInputs placeholder="Localização do Dispositivo" value={localizacao} onChangeText={setLocalizacao} />
        {buttons({buttonProps: {onPress: handleAdicionar, title: 'Conectar'}})}
      </View>
    </SafeView>
  )
}

export default addDispositivo

const styles = StyleSheet.create({})