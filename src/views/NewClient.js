import { StyleSheet, View } from 'react-native'
import React, { useState, useEffect } from 'react'
import { Button, Text, TextInput, Headline, Paragraph, Dialog, Portal } from 'react-native-paper'
import globalStyles from '../assets/styles/global'
import axios from 'axios'

const NewClient = ({ navigation, route }) => {

    const clientUpdate = route.params.client

    const { setConsultApi } = route.params

    const [name, setName] = useState('')
    const [phone, setPhone] = useState('')
    const [email, setEmail] = useState('')
    const [company, setCompany] = useState('')
    const [alert, setAlert] = useState(false)

    useEffect(() => {
        console.log("Cliente...", route.params.client)

        if (clientUpdate) {
            const { name, phone, email, company } = clientUpdate
            setName(name)
            setPhone(phone)
            setEmail(email)
            setCompany(company)
        }
    }, [])

    const saveClient = async () => {
        if (name === '' || phone === '' || email === '' || company === '') {
            setAlert(true)
            return
        }

        const client = {
            name,
            phone,
            email,
            company
        }

        if (clientUpdate) {
            updateClient(client)
        } else {
            createClient(client)
        }

    }

    const createClient = async (client) => {
        try {
            if (Platform.OS === 'ios') {
                await axios.post('http://localhost:3000/clients', client)
                    .then(res => {
                        if (res.status === 201) {
                            cleanForm()
                            navigation.navigate('Home')
                        }
                    })
                    .catch(err => console.log({ err }))
            } else {
                await axios.post('http://192.168.1.147:3000/clients', client)
                    .then(res => {
                        if (res.status === 201) {
                            cleanForm()
                            navigation.navigate('Home')
                        }
                    })
                    .catch(err => console.log({ err }))
            }

        } catch (error) {
            console.log({ error })
        }
    }

    const updateClient = async (client) => {
        try {
            client.id = clientUpdate.id
            if (Platform.OS === 'ios') {
                await axios.put(`http://localhost:3000/clients/${clientUpdate.id}`, client)
                    .then(res => {
                        if (res.status === 200) {
                            cleanForm()
                            navigation.navigate('Home')
                        }
                    })
                    .catch(err => console.log({ err }))
            } else {
                await axios.put(`http://192.168.1.147:3000/clients/${clientUpdate.id}`, client)
                    .then(res => {
                        if (res.status === 200) {
                            cleanForm()
                            navigation.navigate('Home')
                        }
                    })
                    .catch(err => console.log({ err }))
            }

        } catch (error) {
            console.log({ error })
        }
    }

    const cleanForm = () => {
        setName('')
        setPhone('')
        setEmail('')
        setCompany('')
        setConsultApi(true)
    }

    return (
        <View style={styles.container}>
            <Headline style={styles.title}>{clientUpdate ? 'Edit' : 'Add'} New Client</Headline>
            <TextInput
                label="Name"
                placeholder='Your name'
                onChangeText={(text) => { setName(text) }}
                style={styles.input}
                value={name}
            />
            <TextInput
                label="Phone"
                placeholder='Your phone'
                onChangeText={(text) => { setPhone(text) }}
                style={styles.input}
                value={phone}
            />
            <TextInput
                label="Email"
                placeholder='Your email'
                onChangeText={(text) => { setEmail(text) }}
                style={styles.input}
                value={email}

            />
            <TextInput
                label="Company"
                placeholder='Your company'
                onChangeText={(text) => { setCompany(text) }}
                style={styles.input}
                value={company}

            />
            <Button
                icon="pencil-circle"
                mode="contained"
                onPress={() => saveClient()}
            >
                {clientUpdate ? 'Update' : 'Save'} Client
            </Button>

            <Portal>
                <Dialog
                    visible={alert}
                    onDismiss={() => setAlert(false)}
                >
                    <Dialog.Title>Error</Dialog.Title>
                    <Dialog.Content>
                        <Paragraph>All fields are required</Paragraph>
                    </Dialog.Content>
                    <Dialog.Actions>
                        <Button onPress={() => setAlert(false)}>OK</Button>
                    </Dialog.Actions>
                </Dialog>
            </Portal>
        </View>
    )
}

export default NewClient

const styles = StyleSheet.create({
    container: {
        ...globalStyles.container
    },
    title: {
        ...globalStyles.title
    },
    input: {
        marginBottom: 20,
        backgroundColor: 'transparent'
    }
})