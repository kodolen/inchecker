import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

const Profile = () => {

    return (
        <View style={styles.container}>
            <Text style={styles.text}>
                Mijn profiel
            </Text>
        </View>
    )

}

export default Profile

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