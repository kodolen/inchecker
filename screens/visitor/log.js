import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

const Log = () => {

    return (
        <View style={styles.container}>
            <Text style={styles.text}>
                Mijn bezoeken
            </Text>
        </View>
    )

}

export default Log

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FFF",
        justifyContent: 'center',
        alignItems: 'center'
    },
    text: {
        color: "#161924",
        fontSize: 20,
        fontWeight: "500"
    }
})