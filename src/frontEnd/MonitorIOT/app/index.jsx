import { StyleSheet, Text, View, Image, Scr } from 'react-native'
import React from 'react'
import {emailInput, passwordInput} from '../components/Inputs'

const Login = () => {
  return (
    <View style={styles.container}>
      <Image 
      style={{width: 100, height: 150}} source={require('../assets/adaptive-icon.png')} />
      
      <Text style={styles.title}>Login</Text>

      {emailInput()}
      {passwordInput()}

      <View>
        <Text>Esqueci minha senha</Text>
      </View>
    </View>   
  )
}

export default Login

const styles = StyleSheet.create({
  container:{
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 20
  }
})