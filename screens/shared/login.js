import React, { useState } from 'react'
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native'
import * as firebase from 'firebase'

const LogIn = () => {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    return (
        <View style={styles.container}>
            <Text style={styles.text}>
                Inloggen
            </Text>

            <TextInput style={styles.input} placeholder="Email" onChangeText={(email) => {
                setEmail(email)
            }} value={email} />

            <TextInput style={styles.input} placeholder="Wachtwoord" onChangeText={(password) => {
                setPassword(password)
            }} value={password} secureTextEntry={true} />
            <TouchableOpacity style={styles.buttonCreate} onPress={() => {
                console.log("Email: " + email + "| Password: " + password)

                firebase.auth()
                    .signInWithEmailAndPassword(email, password)
                    .then(() => {
                        console.log('User signed in');
                    })
                    .catch(error => {
                        if (error.code) {
                            console.log('Wrong email and/or password combination');
                        }
                        console.error(error);
                    });



            }}><Text style={styles.buttonText}>log in</Text></TouchableOpacity>
        </View>
    )

}

export default LogIn

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
    },
    input: {
        borderWidth: 1,
        padding: 10,
        margin: 5,
        width: 200
    },
    buttonCreate: {
        justifyContent: 'center',
        alignItems: 'center',
        height: 40,
        width: 200,
        backgroundColor: "green",
        margin: 5,
    },
    buttonText: {
        color: 'white'
    },
})