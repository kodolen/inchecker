import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

const Home = () => {

    return (
        <View style={styles.container}>
            <Text style={styles.text}>
                Home
            </Text>
        </View>
    )

}

export default Home

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