import React, { useState, useEffect } from 'react'
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native'
import * as firebase from 'firebase'


const Register = ({ navigation, route }) => {

    const [name, setName] = useState("")
    const [telephone, setTelephone] = useState(Number)
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [isVisitor, setVisitor] = useState("")

    console.log("registreren als" + isVisitor)

    return (
        <View style={styles.container}>
            <Text style={styles.text}>
                {/* Registreer als {isVisitor == "visitor" ? "bezoeker" : "ondernemer"} */}
                Registreren
            </Text>

            <TextInput style={styles.input} placeholder="Volledige naam" onChangeText={(name) => {
                setName(name)
                console.log(name)
            }} value={name} />

            <TextInput style={styles.input} placeholder="Telefoonnummer" onChangeText={(telephone) => {
                setTelephone(telephone)
                console.log(telephone)
            }} value={telephone} />

            <TextInput style={styles.input} placeholder="Email" onChangeText={(email) => {
                setEmail(email)
            }} value={email} />

            <TextInput style={styles.input} placeholder="Wachtwoord" onChangeText={(password) => {
                setPassword(password)
            }} value={password} secureTextEntry={true} />

            <TouchableOpacity style={styles.buttonCreate} onPress={() => {
                console.log("Email: " + email + "| Password: " + password + "| Role: " + isVisitor + " | name: " + name + " | telefoon: " + telephone)

                firebase.auth()
                    .createUserWithEmailAndPassword(email, password)
                    .then(() => {
                        let user = firebase.auth().currentUser;
                        console.log('User account created & signed in!');
                        // user.updateProfile({
                        //     displayName: name,
                        //     phoneNumber: telephone
                        // })

                        firebase.database().ref('roles/' + user.uid).set({
                            role: "visitor",
                            telephone: telephone,
                            name: name
                        })


                        // firebase.database().ref('companies/' + res.user.uid).set({
                        //     companyName: "",
                        //     ownerName: "",
                        //     telephoneNumberOwner: "",
                        //     streetName: "",
                        //     houseNumber: "",
                        //     houseNumberAddition: "",
                        //     zipCode: "",
                        //     city: "",
                        //     lat: "",
                        //     lng: "",
                        // })
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
            <TouchableOpacity>
                <Text>Toch registreren als ondernemer? klik hier</Text>
            </TouchableOpacity>
        </View>
    )

    // function changeRole() {
    //     if (isVisitor == "visitor") {
    //         setVisitor("owner")
    //     } else {
    //         setVisitor("visitor")
    //     }
    // }

}

export default Register

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