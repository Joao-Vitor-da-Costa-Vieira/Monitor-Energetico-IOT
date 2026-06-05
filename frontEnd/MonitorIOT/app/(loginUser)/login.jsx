import { StyleSheet, Text, View, Image, Alert } from 'react-native'
import React, { useState } from 'react'

//api
import { API_CONFIG } from '../../config/api'

//context
import { useUser } from '../../context/UserContext'

// Componentes
import {emailInput, passwordInput} from '../../components/Inputs'
import buttons from '../../components/buttons'
import { Link, router } from 'expo-router'
import loading from '../../components/loading'

// Utils
import { validateEmail, validatePassword, getFormData } from '../../utils/validationInputUtils'

const Login = () => {
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const { setUser, setIsAuthenticated } = useUser()

  const handleLogin = async () => {
    setIsLoading(true)
    // Valida email
    const emailValidation = validateEmail(email)
    if (!emailValidation.isValid) {
      setIsLoading(false)
      Alert.alert('Erro', emailValidation.message)
      return
    }
    
    // Valida senha
    const passwordValidation = validatePassword(senha)
    if (!passwordValidation.isValid) {
      setIsLoading(false)
      Alert.alert('Erro', passwordValidation.message)
      return
    }
    
    try{
      const userData = {
        email: email.trim(),
        pass: senha
      }

         const response = await fetch(`${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.LOGIN_AS_USER}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(userData)
      })

      const data = await response.json()
      console.log('Resposta do login:', data)

      if (response.ok) {
        // Após login bem-sucedido, buscar os dados do usuário logado
        const loggedUserResponse = await fetch(`${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.GET_LOGGED_USER}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          }
        });

        if (loggedUserResponse.ok) {
          const loggedUserData = await loggedUserResponse.json();
          console.log('ID do usuário logado:', loggedUserData);
          
          if (loggedUserData && loggedUserData.usrId) {
            const userResponse = await fetch(`${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.GET_USER}${loggedUserData.usrId}`, {
              method: 'GET',
              headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
              }
            });
            
            if (userResponse.ok) {
              const completeUserData = await userResponse.json();
              console.log('Dados completos do usuário:', completeUserData);
              
              // Salvar os dados do usuário no contexto
              setUser(completeUserData);
              setIsAuthenticated(true);
              
              Alert.alert(
                'Sucesso', 
                `Bem-vindo, ${completeUserData.name}!`,
                [
                  { 
                    text: 'OK', 
                    onPress: () => {
                      router.replace('/home') 
                    }
                  }
                ]
              )
            } else {
              Alert.alert('Erro', 'Não foi possível carregar os dados do usuário')
            }
          } else {
            Alert.alert('Erro', 'Não foi possível identificar o usuário')
          }
        } else {
          Alert.alert('Erro', 'Não foi possível carregar os dados do usuário')
        }
      }
    } catch (error) {
      console.error('Erro na requisição:', error)
      Alert.alert(
        'Erro de Conexão', 
        `Não foi possível conectar ao servidor.\n\nVerifique sua conexão com a internet.`
      )
    } finally {
      setIsLoading(false)
    }
  }

  if (isLoading) {
    return loading();
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