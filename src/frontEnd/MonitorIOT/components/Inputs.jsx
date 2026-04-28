import { StyleSheet, Text, View, TextInput } from 'react-native'
import React from 'react'

const emailInput = () =>{
    return(
        <View style={styles.padding}>
            <TextInput style={styles.input} placeholder="Email" />
        </View>
    )
}

const passwordInput = ( propsInput ) =>{
    return(
        <View style={styles.padding}>
            <TextInput style={styles.input} placeholder={propsInput.placeholder} secureTextEntry />
        </View>
    )
}

export {emailInput, passwordInput};

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