import { StyleSheet, Text, View, TextInput } from 'react-native'
import React from 'react'

const TextoInputs = (propsTextInput) => {
  return (
    <View style={styles.padding}>
      <TextInput 
        style={styles.input} 
        placeholder={propsTextInput.placeholder}
        value={propsTextInput.value}
        onChangeText={propsTextInput.onChangeText}
      />
    </View>
  )
}

const emailInput = (props) => {
    return(
        <View style={styles.padding}>
            <TextInput 
                style={styles.input} 
                placeholder="Email"
                value={props?.value}
                onChangeText={props?.onChangeText}
                keyboardType="email-address"
                autoCapitalize="none"
            />
        </View>
    )
}

const passwordInput = ( propsSenhaInput ) =>{
    return(
        <View style={styles.padding}>
            <TextInput 
                style={styles.input} 
                placeholder={propsSenhaInput.placeholder} 
                secureTextEntry
                value={propsSenhaInput.value}
                onChangeText={propsSenhaInput.onChangeText}
            />
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