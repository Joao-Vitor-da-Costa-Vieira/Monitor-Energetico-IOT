import { StyleSheet, Text, View, Image, Alert } from 'react-native'
import React, { useState } from 'react'
import {emailInput, passwordInput} from '../../components/Inputs'
import buttons from '../../components/buttons'
import { validateAllFields, getFormData } from '../../utils/validationInputUtils'

const cadastro = () => {
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  const [confirmarSenha, setConfirmarSenha] = useState('')

  const handleCadastro = () => {
    // Valida todos os campos
    const validation = validateAllFields(email, senha, confirmarSenha)
    
    if (!validation.isValid) {
      Alert.alert('Erro', validation.message)
      return
    }
    
    // Se todos os campos estiverem preenchidos e válidos
    const formData = getFormData(email, senha, confirmarSenha)
    
    console.log('Dados do cadastro:')
    console.log('Email:', formData.email)
    console.log('Senha:', formData.password)
    console.log('Confirmar Senha:', formData.confirmPassword)
    
    Alert.alert('Sucesso', 'Cadastro realizado com sucesso!')
  }

  return (
    <View style={styles.container}>
      <Image 
      style={{width: 100, height: 150}} source={require('../../assets/lampada.png')} />
      
      <Text style={styles.title}>Cadastro</Text>

      {emailInput({value: email, onChangeText: setEmail})}
      {passwordInput({placeholder: 'Senha', value: senha, onChangeText: setSenha})}
      {passwordInput({placeholder: 'Confirmar Senha', value: confirmarSenha, onChangeText: setConfirmarSenha})}

      {buttons({buttonProps: {onPress: handleCadastro, title: 'Cadastrar'}})}
    </View>
  )
}

export default cadastro

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