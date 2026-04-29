import { StyleSheet, Text, View, TextInput } from 'react-native'
import React from 'react'

const TextoInputs = (propsTextInput) => {
  return (
    <View style={styles.padding}>
      <TextInput style={styles.input} placeholder={propsTextInput.placeholder} />
    </View>
  )
}

const emailInput = () =>{
    return(
        <View style={styles.padding}>
            <TextInput style={styles.input} placeholder="Email" />
        </View>
    )
}

const passwordInput = ( propsSenhaInput ) =>{
    return(
        <View style={styles.padding}>
            <TextInput style={styles.input} placeholder={propsSenhaInput.placeholder} secureTextEntry />
        </View>
    )
}

export {emailInput, passwordInput, TextoInputs};

const styles = StyleSheet.create({
    padding: {
        padding: 5},
    input: {
        borderWidth: 5,
        width: 250,
        height: 47,
        borderColor: 'black',
        padding: 10,
        borderRadius: 10
    }
})