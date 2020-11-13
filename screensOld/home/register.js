import React, { useState } from 'react';
import { StyleSheet, Text, View, Button, TextInput, TouchableOpacity } from 'react-native';
import { RadioButton } from 'react-native-paper';

import * as firebase from 'firebase'
import apiKeys from '../../config/keys'

const Register = ({ navigation }) => {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [isVisitor, setIsVisitor] = useState("visitor")

    return (
        <View style={styles.container}>
            <Text> Maak account </Text>

            <TextInput style={styles.input} placeholder="Email" onChangeText={(email) => {
                setEmail(email)
            }} value={email} />

            <TextInput style={styles.input} placeholder="Wachtwoord" onChangeText={(password) => {
                setPassword(password)
                console.log(isVisitor)
            }} value={password} secureTextEntry={true} />

            <View style={styles.group}>
                <RadioButton
                    value="visitor"
                    status={isVisitor === 'visitor' ? 'checked' : 'unchecked'}
                    onPress={() => setIsVisitor('visitor')}
                />
                <Text>Bezoeker</Text>
            </View>

            <View style={styles.group}>
                <RadioButton
                    value="owner"
                    status={isVisitor === 'owner' ? 'checked' : 'unchecked'}
                    onPress={() => setIsVisitor('owner')}
                />
                <Text>Ondernemer</Text>
            </View>

            <TouchableOpacity style={styles.buttonCreate} onPress={() => {
                console.log("Email: " + email + "| Password: " + password + "| Role: " + isVisitor)

                // if (isVisitor == "visitor") {
                //     firebase.database().ref('visitors/').set({
                //         email: email,
                //         password: password,
                //         role: isVisitor
                //     })
                // } else {
                //     firebase.database().ref('owners/').set({
                //         email: email,
                //         password: password,
                //         role: isVisitor
                //     })
                // }

                firebase.auth()
                    .createUserWithEmailAndPassword(email, password)
                    .then((res) => {
                        console.log('User account created & signed in!');
                        firebase.database().ref('roles/' + res.user.uid).set({
                            role: isVisitor
                        })
                    })
                    .catch(error => {
                        if (error.code === 'auth/email-already-in-use') {
                            console.log('That email address is already in use!');
                        }

                        if (error.code === 'auth/invalid-email') {
                            console.log('That email address is invalid!');
                        }

                        console.error(error);
                    });



            }}><Text style={styles.buttonText}>Maak account aan</Text></TouchableOpacity>

            {}

        </View>
    )

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    input: {
        borderWidth: 1,
        padding: 10,
        margin: 5,
        width: 200
    },
    group: {
        width: 200,
        flexDirection: 'row',
        alignContent: 'flex-start',
        alignItems: 'center'

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
});

export default Register