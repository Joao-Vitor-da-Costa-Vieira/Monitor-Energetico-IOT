import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'
import { useEffect } from 'react'

// Context
import { useUser } from '../../context/UserContext'

// Componentes
import {emailInput, passwordInput} from '../components/Inputs'
import buttons from '../components/buttons'
import { Link, router } from 'expo-router'

const Index = () => {
  const { isAuthenticated, isLoading, loadUser } = useUser();

  useEffect(() => {
    const checkUser = async () => {
      const userExists = await loadUser();
      if (userExists) {
        router.replace('/home');
      }
    };
    
    checkUser();
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  if (!isAuthenticated) {
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

  return <Loading />;
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