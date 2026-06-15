// app/(loginUser)/login.jsx
import { StyleSheet, View, Image, Text } from 'react-native'
import loading from '../../components/loading'
import { emailInput, passwordInput } from '../../components/Inputs'
import buttons from '../../components/buttons'
import { useLogin } from '../../hooks/useLogin'

const Login = () => {
  const { email, setEmail, senha, setSenha, isLoading, handleLogin } = useLogin()

  if (isLoading) {
    return loading()
  }

  return (
    <View style={styles.container}>
      <Image 
        style={{width: 100, height: 150}} 
        source={require('../../assets/lampada.png')} 
      />
      
      <Text style={styles.title}>Login</Text>
      {emailInput({value: email, onChangeText: setEmail})}
      {passwordInput({placeholder: 'Senha', value: senha, onChangeText: setSenha})}

      {buttons({buttonProps: {onPress: handleLogin, title: 'Entrar'}})}
    </View>   
  )
}

export default Login

const styles = StyleSheet.create({
  container: {
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