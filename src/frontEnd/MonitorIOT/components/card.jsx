import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const Card = ({style, ...props}) => {
  return (
    <View
      style={[ styles.card, style]}
      {...props}
    />
  )
}

export default Card

const styles = StyleSheet.create({
    card: {backgroundColor: 'lightblue', 
        padding: 10, 
        margin: 10,
        borderColor: 'black',
        borderWidth: 1,
        borderRadius: 5,
    }
})