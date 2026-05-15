import { StyleSheet, Text, View, Image, Alert } from 'react-native'
import React, { useState } from 'react'
import {emailInput, passwordInput} from '../../components/Inputs'
import buttons from '../../components/buttons'
import { Link, router } from 'expo-router'
import { validateEmail, validatePassword, getFormData } from '../../utils/validationInputUtils'

const Login = () => {
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')

  const handleLogin = () => {
    // Valida email
    const emailValidation = validateEmail(email)
    if (!emailValidation.isValid) {
      Alert.alert('Erro', emailValidation.message)
      return
    }
    
    // Valida senha
    const passwordValidation = validatePassword(senha)
    if (!passwordValidation.isValid) {
      Alert.alert('Erro', passwordValidation.message)
      return
    }
    
    // Se todos os campos estiverem preenchidos e válidos
    const formData = getFormData(email, senha, '')
    
    console.log('Dados do login:')
    console.log('Email:', formData.email)
    console.log('Senha:', formData.password)
    
    // Aqui você pode adicionar lógica de autenticação
    
    // Redireciona para home após login bem-sucedido
    router.push('/home')
  }

  return (
    <View style={styles.container}>
      <Image 
      style={{width: 100, height: 150}} source={require('../../assets/lampada.png')} />
      
      <Text style={styles.title}>Login</Text>

      {emailInput({value: email, onChangeText: setEmail})}
      {passwordInput({placeholder: 'Senha', value: senha, onChangeText: setSenha})}

      {buttons({buttonProps: {onPress: handleLogin, title: 'Entrar'}})}
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