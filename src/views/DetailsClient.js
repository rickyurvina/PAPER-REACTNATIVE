import { StyleSheet, View, Alert } from 'react-native'
import React from 'react'
import { Headline, Text, Subheading, Button, FAB } from 'react-native-paper'
import globalStyles from '../assets/styles/global'
import axios from 'axios'

const DetailsClient = ({ navigation, route }) => {
    console.log(route.params)

    const { name, phone, email, company, id } = route.params.item
    const { setConsultApi } = route.params

    const deleteItem = () => {
        Alert.alert(
            "Are you sure you want to delete this client?",
            "A deleted client cannot be recovered",
            [
                {
                    text: "Yes, delete",
                    onPress: () => deleteClient()
                },
                {
                    text: "Cancel",
                }
            ]
        )
    }

    const deleteClient = async () => {
        try {
            if (Platform.OS === 'ios') {
                await axios.delete(`http://localhost:3000/clients/${id}`)
                    .then(res => {
                        if (res.status === 200) {
                            setConsultApi(true)
                            navigation.navigate('Home')
                        }
                    })
                    .catch(err => console.log({ err }))
            } else {

                await axios.delete(`http://192.168.1.147:3000/clients/${id}`)
                    .then(res => {
                        if (res.status === 200) {
                            setConsultApi(true)
                            navigation.navigate('Home')
                        }
                    })
                    .catch(err => console.log({ err }))
            }
        } catch (error) {
            console.log({ error })
        }
    }

    return (
        <View style={globalStyles.container}>
            <Headline style={globalStyles.title}>{name}</Headline>
            <Text style={styles.text}>Company:
                <Subheading>{company}
                </Subheading>
            </Text>
            <Text style={styles.text}>Email:
                <Subheading>{email}
                </Subheading>
            </Text>
            <Text style={styles.text}>Phone:
                <Subheading>{phone}
                </Subheading>
            </Text>

            <Button
                mode='contained'
                icon='cancel'
                style={styles.btn}
                onPress={() => deleteItem()}
            >
                Delete client
            </Button>
            <FAB
                icon="pencil"
                style={styles.fab}
                onPress={() => navigation.navigate('NewClient',
                    {
                        client: route.params.item,
                        setConsultApi
                    })}
            />
        </View>
    )
}

export default DetailsClient

const styles = StyleSheet.create({
    text: {
        marginBottom: 20,
        fontSize: 18,
    },
    btn: {
        marginTop: 100,
        backgroundColor: 'red'
    },
    fab: {
        ...globalStyles.fab,
    }

})