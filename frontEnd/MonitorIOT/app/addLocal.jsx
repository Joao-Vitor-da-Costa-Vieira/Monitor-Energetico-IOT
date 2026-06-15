import { StyleSheet, Text, View } from 'react-native'
import { router } from 'expo-router'

//componentes
import SafeView from '../components/safeView'
import { TextoInputs } from '../components/Inputs'
import buttons from '../components/buttons'
import Loading from '../components/loading'
import { useAddLocal } from '../hooks/useAddLocal'

const addLocal = () => {
  const { 
    nome, setNome,
    isLoading,
    isCheckingAuth,
    handleAdicionar 
  } = useAddLocal()

  // Se ainda está verificando autenticação
  if (isCheckingAuth) {
    return <Loading />
  }

  if (isLoading) {
    return <Loading />
  }

  return (
    <SafeView>
      <View style={styles.container}>
        <Text style={styles.title}>Adicione um Novo Local</Text>
        
        <TextoInputs 
          placeholder="Novo Local" 
          value={nome} 
          onChangeText={setNome} 
        />
        
        {buttons({buttonProps: {onPress: handleAdicionar, title: 'Adicionar Local'}})}
      </View>
    </SafeView>
  )
}

export default addLocal

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