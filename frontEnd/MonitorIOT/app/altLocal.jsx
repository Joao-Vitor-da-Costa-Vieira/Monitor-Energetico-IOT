// app/altLocal.jsx
import { StyleSheet, Text, View, Alert } from 'react-native'
import { useLocalSearchParams, router } from 'expo-router'
import React, { useState, useEffect } from 'react'

//componentes
import SafeView from '../components/safeView'
import { TextoInputs } from '../components/Inputs'
import buttons from '../components/buttons'
import Loading from '../components/loading'

//utils
import { validateTextInput } from '../utils/validationInputUtils'

//api e context
import { API_CONFIG } from '../config/api'
import { usePlace } from '../context/PlaceContext'
import { useUser } from '../context/UserContext'

const altLocal = () => {
  const { id, title, place } = useLocalSearchParams()
  
  const [newPlace, setNewPlace] = useState(place || '')
  const [isLoading, setIsLoading] = useState(false)
  const [isCheckingAuth, setIsCheckingAuth] = useState(true)
  const [localUserId, setLocalUserId] = useState(null)
  
  const { loadPlaces } = usePlace()
  const { user, loadUser } = useUser()

  // Verificar autenticação quando a tela abrir
  useEffect(() => {
    const checkAuth = async () => {
      console.log('Verificando autenticação...')
      
      if (!user) {
        await loadUser()
      }
      
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
        Alert.alert('Erro', 'Você precisa estar logado para alterar um local.')
        router.replace('/login')
      }
    }
    
    checkAuth()
  }, [])

  useEffect(() => {
    console.log('Parâmetros recebidos:', { id, title, place })
  }, [])

  if (isCheckingAuth) {
    return <Loading />
  }

  const handleAlterar = async () => {
    const placeValidation = validateTextInput(newPlace)
    if (!placeValidation.isValid) {
      Alert.alert('Erro', placeValidation.message)
      return
    }

    if (!id) {
      Alert.alert('Erro', 'ID do local não encontrado.')
      return
    }

    setIsLoading(true)

    try {
      const usrId = localUserId || user?.usrId
      const placeId = Number(id)
      
      console.log('Place ID:', placeId)
      console.log('User ID:', usrId)
      console.log('Novo nome:', newPlace.trim())

      if (!usrId) {
        Alert.alert('Erro', 'Usuário não identificado.')
        router.replace('/login')
        return
      }

      const placeData = {
        name: newPlace.trim(),
        usrId: usrId
      }

      console.log('Dados enviados:', placeData)

      const url = `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.UPDATE_PLACE}${placeId}`
      console.log('URL completa:', url)

      const response = await fetch(url, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(placeData),
        credentials: 'include'
      })

      console.log('Resposta UPDATE_PLACE status:', response.status)

      if (response.ok) {
        Alert.alert('Sucesso', 'Local alterado com sucesso!')
        await loadPlaces(usrId)
        router.back()
      } else {
        const errorData = await response.json().catch(() => ({}))
        console.error('Erro ao alterar local:', response.status, errorData)
        Alert.alert('Erro', errorData.message || 'Não foi possível alterar o local.')
      }
    } catch (error) {
      console.error('Erro na requisição:', error)
      Alert.alert('Erro', 'Ocorreu um erro ao conectar com o servidor.')
    } finally {
      setIsLoading(false)
    }
  }

  if (isLoading) {
    return <Loading />
  }

  return (
    <SafeView>
      <View style={styles.container}>
        <Text style={styles.title}>Alterar Local</Text>
        
        <TextoInputs 
          placeholder={place || 'Nome do Local'} 
          value={newPlace} 
          onChangeText={setNewPlace} 
        />
        
        {buttons({buttonProps: {onPress: handleAlterar, title: 'Alterar'}})}
      </View>
    </SafeView>
  )
}

export default altLocal

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 10,
    paddingHorizontal: 20
  },
  title: {
    fontSize: 20, 
    fontWeight: 'bold', 
    paddingBottom: 20,
    textAlign: 'center'
  }
})