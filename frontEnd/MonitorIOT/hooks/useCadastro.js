import { useState } from 'react'
import { Alert } from 'react-native'
import { router } from 'expo-router'
import { API_CONFIG } from '../config/api'
import { validateAllLoginFields, validateTextInput, getFormData, validatePasswordStrength } from '../utils/validationInputUtils'

export const useCadastro = () => {
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  const [confirmarSenha, setConfirmarSenha] = useState('')
  const [nome, setNome] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleCadastro = async () => {
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
      const userData = {
        name: nome.trim(),
        email: email.trim(),
        pass: senha
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

      const passwordValidation = validatePasswordStrength(data)
      if (!passwordValidation.isValid) {
        Alert.alert('Erro ao cadastrar', passwordValidation.message)
        return
      }

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

  return {
    email,
    setEmail,
    senha,
    setSenha,
    confirmarSenha,
    setConfirmarSenha,
    nome,
    setNome,
    isLoading,
    handleCadastro
  }
}