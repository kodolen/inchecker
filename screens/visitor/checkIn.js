import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

const CheckIn= () => {

    return (
        <View style={styles.container}>
            <Text style={styles.text}>
                check in
            </Text>
        </View>
    )

}

export default CheckIn

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