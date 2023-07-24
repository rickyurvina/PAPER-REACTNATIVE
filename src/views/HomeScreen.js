import { StyleSheet, Text, View, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { List, Headline, Button, FAB } from 'react-native-paper'
import globalStyles from '../assets/styles/global'

const HomeScreen = (props) => {
    const { navigation } = props
    const [clients, setClients] = useState([]);
    const [consultApi, setConsultApi] = useState(true)

    useEffect(() => {
        if (consultApi) {
            getClientsApi()
        }
    }, [consultApi])

    const getClientsApi = async () => {
        try {
            if (Platform.OS === 'ios') {
                await axios.get('http://localhost:3000/clients')
                    .then(res => {
                        if (res.status === 200) {
                            setClients(res.data)
                            setConsultApi(false)
                        }
                    })
                    .catch(err => console.log({ err }))
            } else {

                await axios.get('http://192.168.1.147:3000/clients')
                    .then(res => {
                        if (res.status === 200) {
                            setClients(res.data)
                            setConsultApi(false)
                        }
                    })
                    .catch(err => console.log({ err }))
            }
        } catch (error) {
            console.log({ error })
        }
    }

    return (
        <View style={globalStyles.title}>
            <Button
                icon="plus-circle"
                onPress={() => navigation.navigate('NewClient', { setConsultApi })}
            >
                New Client
            </Button>
            <Headline style={globalStyles.title}>
                List of Clients
            </Headline>
            {clients.length > 0 ?
                <FlatList
                    data={clients}
                    key={client => (client.id).toString()}
                    renderItem={({ item }) => (
                        <List.Item
                            title={item.name}
                            description={item.company}
                            onPress={() =>
                                navigation.navigate('DetailsClient', { item, setConsultApi }
                                )}

                        />
                    )}
                />

                :
                <Text>No hay clientes</Text>
            }

            <FAB
                icon="plus"
                style={styles.fab}
                onPress={() => navigation.navigate('NewClient', { setConsultApi })}
            />
        </View>
    )
}

export default HomeScreen

const styles = StyleSheet.create({
    fab: {
        ...globalStyles.fab,
    }
})