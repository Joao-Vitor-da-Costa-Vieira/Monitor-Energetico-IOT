import { StyleSheet, Text, View, FlatList } from 'react-native'
import { router } from 'expo-router'
import { useEffect } from 'react'

//componentes
import SafeView from '../../components/safeView'
import Card from '../../components/card'
import buttons from '../../components/buttons'
import { buttonOptions } from '../../components/buttons'
import Loading from '../../components/loading'
import { useDispositivo } from '../../hooks/useDispositivo'

const Dispositivo = () => {
  const { 
    placesList,
    isRefreshing,
    userLoading,
    hasLoadedData,
    user,
    loadAllData,
    getPlaceStatus,
    getStatusColor,
    shouldRedirect // Importar o estado
  } = useDispositivo()

  // Efeito para redirecionamento baseado no estado do hook
  useEffect(() => {
    if (shouldRedirect) {
      console.log('Redirecionando para login')
      router.replace('/')
    }
  }, [shouldRedirect])

  // Mostrar loading enquanto carrega o usuário ou os dados iniciais
  if (userLoading || (!hasLoadedData.current && !user?.id)) {
    return (
      <SafeView scrollable={false}>
        <Loading />
      </SafeView>
    )
  }

  // Se não tem usuário após carregamento, retorna null (useEffect fará o redirect)
  if (!user?.id) {
    return null
  }

  return (
    <SafeView scrollable={false}>
      <Card style={styles.cardTitle}>
        <Text style={styles.cardContent}>Locais</Text>
      </Card>

      <View style={styles.buttonContainer}>
        {buttons({buttonProps: {onPress: () => router.push('/addLocal'), title: 'Adicionar Local'}})}
      </View>

      <FlatList 
        data={placesList}
        contentContainerStyle={styles.listContainer}
        renderItem={({item}) => {
          const status = getPlaceStatus(item)
          const statusColor = getStatusColor(status)
          
          return (
            <Card style={styles.card}>
              <View style={styles.cardRow}>
                <View style={styles.cardInfo}>
                  <Text style={styles.cardContent}>{item.name}</Text>
                  <View style={styles.statusContainer}>
                    <Text style={[styles.cardDescription, {color: statusColor}]}>
                      {status}
                    </Text>
                    <Text style={styles.measurementsText}>
                      📊 {item.measurements?.length || 0} medições
                    </Text>
                  </View>
                </View>
                <View style={styles.buttonWrapper}>
                  {buttonOptions({buttonOptionsProps: { 
                    onPress: () => {
                      console.log('Editando local:', item.id, item.name)
                      router.push({ 
                        pathname: '/altLocal', 
                        params: { 
                          id: String(item.id), 
                          title: item.name, 
                          place: item.name 
                        }
                      })
                    }, 
                    title: '...'
                  }})}
                </View>
              </View>
            </Card>
          )
        }}
        keyExtractor={item => item.id.toString()}
        refreshing={isRefreshing}
        onRefresh={loadAllData}
        showsVerticalScrollIndicator={true}
      />
    </SafeView>
  )
}

export default Dispositivo

const styles = StyleSheet.create({
  buttonContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
    width: '100%',
  },
  listContainer: {
    alignItems: 'center',
  },
  card: {
    width: '90%',
    marginVertical: 4,
    padding: 12,
    borderRadius: 10,
    alignSelf: 'center',
  },
  cardTitle: {
    justifyContent: 'center',
    alignItems: 'center',
    margin: 12.5,
    width: '90%',
    alignSelf: 'center',
  },
  cardRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
  cardInfo: {
    flex: 1,
    marginRight: 10,
  },
  cardContent: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  cardDescription: {
    fontSize: 12,
    marginTop: 4,
    fontWeight: '500',
  },
  statusContainer: {
    marginTop: 5,
  },
  measurementsText: {
    fontSize: 11,
    color: '#888',
    marginTop: 2,
  },
  buttonWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
  },
})