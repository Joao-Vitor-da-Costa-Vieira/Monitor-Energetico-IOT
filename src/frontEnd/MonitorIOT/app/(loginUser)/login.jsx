import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'
import {emailInput, passwordInput} from '../components/Inputs'
import buttons from '../components/buttons'
import { Link } from 'expo-router'

const Login = () => {
  return (
    <View style={styles.container}>
      <Image 
      style={{width: 100, height: 150}} source={require('../assets/adaptive-icon.png')} />
      
      <Text style={styles.title}>Login</Text>

      {emailInput()}
      {passwordInput()}

      {buttons({buttonProps: {onPress: () => console.log('Pressed'), title: 'Entrar'}})}

      <View>
        <Link href="/cadastro" style={styles.link}>Cadastre-se</Link>
      </View>
      <View>
        <Link href="/" style={styles.link}>Esqueci minha senha</Link>
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
    marginTop: 10
  },
  link: {
    color: '#01cfeb',
    textDecorationLine: 'underline',
    marginTop: 3
  }
})