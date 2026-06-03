import { StyleSheet, Text, View, Image, Alert } from 'react-native'
import React, { useState } from 'react'

//api
import {API_CONFIG} from '../../config/api'

//componentes
import {emailInput, passwordInput, TextoInputs} from '../../components/Inputs'
import buttons from '../../components/buttons'
import loading from '../../components/loading'

//utils
import { validateAllLoginFields,   validateTextInput, getFormData } from '../../utils/validationInputUtils'

const cadastro = () => {
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  const [confirmarSenha, setConfirmarSenha] = useState('')
  const [nome, setNome] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleCadastro = () => {
    // Valida todos os campos
    const validation = validateAllLoginFields(email, senha, confirmarSenha)
    
    if (!validation.isValid) {
      Alert.alert('Erro', validation.message)
      return
    }

    const nomeValidation = validateTextInput(nome, 'nome')
    if (!nomeValidation.isValid) {
      Alert.alert('Erro', nomeValidation.message)
      return
    }

    setIsLoading(true)
    
    // Se todos os campos estiverem preenchidos e válidos
    try{
      const useData = {
        name: nome.trim(),
        email: email.trim(),
        password: senha,
        confirmPassword: confirmarSenha
      }

      const response = await fetch(`${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.CREATE_ACCOUNT}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(userData)
      })

      console.log('Status da resposta:', response.status)

      const data = await response.json()
      console.log('Resposta do servidor:', data)

            if (response.ok) {
        // Success case - account created
        Alert.alert(
          'Sucesso', 
          'Cadastro realizado com sucesso!',
          [
            {
              text: 'OK',
              onPress: () => {
                router.back()
                setNome('')
                setEmail('')
                setSenha('')
                setConfirmarSenha('')
              }
            }
          ]
        )
      } else {
        const errorMessage = data.message || data.error || 'Falha ao realizar cadastro. Tente novamente.'
        Alert.alert('Erro no Cadastro', errorMessage)
      }
    }
    catch(error){
      console.error('Erro na requisição:', error)
    
      Alert.alert(
        'Erro de Conexão', 
        `Não foi possível conectar ao servidor em:\n${API_CONFIG.BASE_URL}\n\nVerifique se o backend está rodando e o endereço está correto.\n\nDetalhes: ${error.message}`
      )
    }
    finally{
      setIsLoading(false)
    }

    Alert.alert('Sucesso', 'Cadastro realizado com sucesso!')
  }

  return (
    <View style={styles.container}>
      <Image 
      style={{width: 100, height: 150}} source={require('../../assets/lampada.png')} />
      
      <Text style={styles.title}>Cadastro</Text>

      <TextoInputs placeholder="Nome" value={nome} onChangeText={setNome} />
      {emailInput({value: email, onChangeText: setEmail})}
      {passwordInput({placeholder: 'Senha', value: senha, onChangeText: setSenha})}
      {passwordInput({placeholder: 'Confirmar Senha', value: confirmarSenha, onChangeText: setConfirmarSenha})}

      {isLoading ? loading() : 
      (buttons({buttonProps: {onPress: handleCadastro, title: 'Cadastrar'}}))
      }
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