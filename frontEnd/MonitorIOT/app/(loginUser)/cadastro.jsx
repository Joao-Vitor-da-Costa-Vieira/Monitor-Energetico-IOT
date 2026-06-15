import { StyleSheet, View, Image, Text } from 'react-native'
import { emailInput, passwordInput, TextoInputs } from '../../components/Inputs'
import buttons from '../../components/buttons'
import loading from '../../components/loading'
import { useCadastro } from '../../hooks/useCadastro'

const cadastro = () => {
  const { 
    email, setEmail,
    senha, setSenha,
    confirmarSenha, setConfirmarSenha,
    nome, setNome,
    isLoading,
    handleCadastro 
  } = useCadastro()

  if (isLoading) {
    return loading()
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