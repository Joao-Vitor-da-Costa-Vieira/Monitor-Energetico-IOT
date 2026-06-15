import { StyleSheet, Text, View, Image } from 'react-native'
import React, { useState, useEffect } from 'react'

// Context
import { useUser } from '../context/UserContext'

// Componentes
import {emailInput, passwordInput} from '../components/Inputs'
import buttons from '../components/buttons'
import { Link, router } from 'expo-router'
import loading from '../components/loading'

const Index = () => {
  const { isAuthenticated, isLoading: userLoading, loadUser } = useUser();
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    const checkUser = async () => {
      try {
        // Força uma verificação nova no servidor
        const userExists = await loadUser();
        console.log('Verificação de usuário:', userExists ? 'Logado' : 'Não logado');
        
        if (userExists) {
          router.replace('/home');
        }
      } catch (error) {
        console.error('Erro ao verificar usuário:', error);
      } finally {
        setIsChecking(false);
      }
    };
    
    checkUser();
  }, []);

  // Mostra loading enquanto verifica
  if (isChecking || userLoading) {
    return loading();
  }

  // Se não está autenticado, mostra tela de login
  return (
    <View style={styles.container}>
      <Image 
        style={{width: 100, height: 150}} source={require('../assets/lampada.png')} />
      
      <Text style={styles.title}>Entre em sua conta</Text>

      {buttons({buttonProps: {onPress: () => router.push('/(loginUser)/login'), title: 'Entrar'}})}

      <View>
        <Link href="/(loginUser)/cadastro" style={styles.link}>Cadastre-se</Link>
      </View>
    </View>   
  )
}

export default Index

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