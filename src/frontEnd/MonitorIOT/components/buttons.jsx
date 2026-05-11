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

const buttonCancel = ({ buttonCancelProps }) => {
  return (
    <View>
      <TouchableOpacity 
        onPress={buttonCancelProps.onPress}
        style={styles.buttonCancel}
      >
        <Text style={styles.buttonText}>{buttonCancelProps.title}</Text>
      </TouchableOpacity>
    </View>
  )
}

const buttonOptions = ({ buttonOptionsProps }) => {
  return (
    <View>
      <TouchableOpacity 
        onPress={buttonOptionsProps.onPress}
        style={styles.buttonOptions}
      >
        <Text style={styles.buttonText}>{buttonOptionsProps.title}</Text>
      </TouchableOpacity>
    </View>
  )
}
export default buttons
export { buttonCancel, buttonOptions }

const styles = StyleSheet.create({
  button: {
    backgroundColor: 'lightblue',
    padding: 10,
    marginTop: 10,
    marginBottom: 10,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonCancel: {
    backgroundColor: 'red',
    paddingTop: 2,
    paddingBottom: 2,
    paddingLeft: 10,
    paddingRight: 10,
    marginTop: 11,
    height: 35,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonOptions: { 
    backgroundColor: 'gray',
    paddingTop: 2,
    paddingBottom: 2,
    paddingLeft: 10,
    paddingRight: 9,
    marginTop: 11,
    height: 35,
    borderRadius: 5,
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