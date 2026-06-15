import { useState, useEffect } from 'react'
import { Alert } from 'react-native'
import { router } from 'expo-router'

//utils
import { validateTextInput } from '../utils/validationInputUtils'

//api e context
import { API_CONFIG } from '../config/api'
import { usePlace } from '../context/PlaceContext'
import { useUser } from '../context/UserContext'

export const useAddLocal = () => {
  const [nome, setNome] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isCheckingAuth, setIsCheckingAuth] = useState(true)
  const [localUserId, setLocalUserId] = useState(null)
  
  const { loadPlaces } = usePlace()
  const { user, loadUser } = useUser()

  // Verificar autenticação quando a tela abrir
  useEffect(() => {
    const checkAuth = async () => {
      console.log('Verificando autenticação...')
      
      // Primeiro tenta carregar o usuário se não existir
      if (!user) {
        await loadUser()
      }
      
      // Se ainda não tem usuário, busca diretamente da API
      if (!user || !user.usrId) {
        console.log('Buscando usuário diretamente da API...')
        try {
          const response = await fetch(`${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.GET_LOGGED_USER}`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json'
            },
            credentials: 'include'
          })
          
          if (response.ok) {
            const loggedUserData = await response.json()
            console.log('Usuário logado (direto):', loggedUserData)
            
            if (loggedUserData && loggedUserData.usrId) {
              setLocalUserId(loggedUserData.usrId)
              setIsCheckingAuth(false)
              return
            }
          }
        } catch (error) {
          console.error('Erro ao buscar usuário diretamente:', error)
        }
      } else if (user && user.usrId) {
        setLocalUserId(user.usrId)
      }
      
      setIsCheckingAuth(false)
      
      if (!user && !localUserId) {
        Alert.alert('Erro', 'Você precisa estar logado para adicionar um local.')
        router.replace('/login')
      }
    }
    
    checkAuth()
  }, [])

  const handleAdicionar = async () => {
    // Valida o nome do local
    const nomeValidation = validateTextInput(nome)
    if (!nomeValidation.isValid) {
      Alert.alert('Erro', nomeValidation.message)
      return
    }

    setIsLoading(true)

    try {
      const usrId = localUserId || user?.usrId
      console.log('Usuário ID usado:', usrId)

      if (!usrId) {
        Alert.alert('Erro', 'Usuário não identificado. Por favor, faça login novamente.')
        router.replace('/login')
        return
      }

      // Prepara os dados para envio
      const placeData = {
        name: nome.trim()
      }

      console.log('Dados a serem enviados:', placeData)

      const response = await fetch(`${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.CREATE_PLACE}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(placeData),
        credentials: 'include'
      })

      console.log('Resposta CREATE_PLACE status:', response.status)

      if (response.ok) {
        const newPlace = await response.json()
        Alert.alert('Sucesso', 'Local adicionado com sucesso!')
        
        // Recarrega a lista de lugares
        await loadPlaces(usrId)
        
        // Volta para a tela anterior
        router.back()
      } else {
        const errorData = await response.json().catch(() => ({}))
        console.error('Erro ao criar local:', response.status, errorData)
        
        if (response.status === 400 && errorData.message?.includes('conectado')) {
          Alert.alert('Sessão expirada', 'Sua sessão expirou. Por favor, faça login novamente.')
          router.replace('/login')
        } else {
          Alert.alert('Erro', errorData.message || 'Não foi possível adicionar o local. Por favor, tente novamente.')
        }
      }
    } catch (error) {
      console.error('Erro na requisição:', error)
      Alert.alert('Erro', 'Ocorreu um erro ao conectar com o servidor. Por favor, verifique sua conexão e tente novamente.')
    } finally {
      setIsLoading(false)
    }
  }

  return {
    nome,
    setNome,
    isLoading,
    isCheckingAuth,
    handleAdicionar
  }
}