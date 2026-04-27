import { StyleSheet, TouchableOpacity, Text, View } from 'react-native'
import React from 'react'

const buttons = ({ buttonProps }) => {
  return (
    <View>
      <TouchableOpacity 
        onPress={buttonProps.onPress}
        style={styles.button}
      >
        <Text style={styles.buttonText}>{buttonProps.title}</Text>
      </TouchableOpacity>
    </View>
  )
}

export default buttons

const styles = StyleSheet.create({
  button: {
    backgroundColor: 'lightblue',
    padding: 10,
    width: 100,
    marginTop: 10,
    marginBottom: 10,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: 'black',
    fontSize: 16,
    fontWeight: 'bold',
  }
})