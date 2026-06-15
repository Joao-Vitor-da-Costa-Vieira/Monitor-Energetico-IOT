import { StyleSheet, Text, View } from 'react-native'
import { useLocalSearchParams } from 'expo-router'

//componentes
import SafeView from '../components/safeView'
import { TextoInputs } from '../components/Inputs'
import buttons from '../components/buttons'
import Loading from '../components/loading'
import { useAltLocal } from '../hooks/useAltLocal'

const altLocal = () => {
  const { id, title, place } = useLocalSearchParams()
  
  const { 
    newPlace, setNewPlace,
    isLoading,
    isCheckingAuth,
    handleAlterar 
  } = useAltLocal(id, place)

  if (isCheckingAuth) {
    return <Loading />
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