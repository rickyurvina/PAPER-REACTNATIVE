import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Button } from 'react-native-paper'
const Nav = ({navigation, route}) => {

    const handlePress = () => {
        navigation.navigate('NewClient')
    }
    return (
        <Button onPress={() => handlePress()}
            textColor='white'
            icon="plus-circle"
        >
            Client
        </Button>
    )
}

export default Nav

const styles = StyleSheet.create({})