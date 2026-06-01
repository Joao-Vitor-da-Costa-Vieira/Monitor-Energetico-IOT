import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'
import {emailInput, passwordInput} from '../components/Inputs'
import buttons from '../components/buttons'
import { Link, router } from 'expo-router'

const Login = () => {
  return (
    <View style={styles.container}>
      <Image 
      style={{width: 100, height: 150}} source={require('../assets/lampada.png')} />
      
      <Text style={styles.title}>Entre em sua conta</Text>

      {buttons({buttonProps: {onPress: () => console.log('Pressed'), title: 'Entrar', onPress: () => router.push('/(loginUser)/login')}})}

      <View>
        <Link href="/(loginUser)/cadastro" style={styles.link}>Cadastre-se</Link>
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