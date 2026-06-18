import { StyleSheet, Text, View } from 'react-native'

//componentes
import SafeView from '../../components/safeView'
import Card from '../../components/card'
import Loading from '../../components/loading'
import buttons from '../../components/buttons'
import { useHome } from '../../hooks/useHome'

const Home = () => {
  const { 
    user,
    lastConsumption,
    lastConsumptionPlace,
    lastConsumptionDevice,
    weeklyAverage,
    highestConsumptionPlace,
    activePlaceName,
    isFirstLoading,
    formatPower,
    handleLogout
  } = useHome()

  if (isFirstLoading) {
    return <Loading />
  }

  return (
    <SafeView>
      <Card style={styles.cardTitle}>
        <Text style={styles.cardContent}>Home</Text>
      </Card>

      <View style={styles.container}>
        <Card style={styles.card}>
          <Text style={styles.cardContent}>Último Consumo Medido</Text>
          <Text style={styles.cardDescription}>{formatPower(lastConsumption)}</Text>
          {lastConsumptionPlace && lastConsumptionPlace !== 'Nenhum local' && (
            <Text style={styles.cardDescription}>📍 {lastConsumptionPlace}</Text>
          )}  
        </Card>
        
        <Card style={styles.card}>
          <Text style={styles.cardContent}>Média de Consumo</Text>
          <Text style={styles.cardDescription}>{formatPower(weeklyAverage)}</Text>
        </Card>
        
        <Card style={styles.card}>
          <Text style={styles.cardContent}>Local com maior consumo</Text>
          <Text style={styles.cardDescription}>{highestConsumptionPlace}</Text>
        </Card>

        <Card style={styles.card}>
          <Text style={styles.cardContent}>Usuário:</Text>
          <Text style={styles.cardDescription}>{user?.name || 'Nome do Usuário'}</Text>
        </Card>

        <Card style={styles.card}>
          <Text style={styles.cardContent}>Local Ativo Atual:</Text>
          <Text style={styles.cardDescription}>{activePlaceName || 'Nenhum local selecionado'}</Text>
        </Card>

        {buttons({buttonProps: {onPress: handleLogout, title: 'Sair da Sessão'}})}
      </View>
    </SafeView>
  )
}

export default Home

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    card: {
        justifyContent: 'center',
        alignItems: 'center',
        height: 'auto',
        minHeight: 80,
        width: ('90%'),
        marginTop: 20,
        marginBottom: 10,
        padding: 15,
    },
    cardTitle: {
        justifyContent: 'center',
        alignItems: 'center',
        margin: 12.5,
    },
    cardContent: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#fff',
    },
    cardDescription: {
        fontSize: 14,
        color: '#fff',
        marginTop: 5,
    }
})