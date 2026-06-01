import { StyleSheet, Text, View } from 'react-native'
import { useLocalSearchParams } from 'expo-router'
import React, {useState} from 'react'

//componentes
import  SafeView  from '../components/safeView'
import { TextoInputs } from '../components/Inputs'
import buttons from '../components/buttons'

const altDispositivo = () => {
  const { id, title, place } = useLocalSearchParams()

 const [newTitle, setNewTitle] = useState(title || '')
  const [newPlace, setNewPlace] = useState(place || '')

  const handleAlterar = () => {

    console.log('Dispositivo alterado:', { id, newTitle, newPlace })
  }

  return (
    <SafeView>
      <View style={{ justifyContent: 'center', alignItems: 'center', paddingTop: 10}}>
        <Text style={{ fontSize: 20, fontWeight: 'bold', paddingBottom: 5 }}>Alterar o Dispositivo</Text>
        <TextoInputs placeholder={title} value={newTitle} onChangeText={setNewTitle} />
        <TextoInputs placeholder={place || 'Localização do Dispositivo'} value={newPlace} onChangeText={setNewPlace} />
        {buttons({buttonProps: {onPress: handleAlterar, title: 'Alterar'}})}
      </View>
    </SafeView>
  )
}

export default altDispositivo

const styles = StyleSheet.create({})