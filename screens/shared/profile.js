import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native'
import key from '../../config/here'

//import database
import * as firebase from 'firebase'

const Profile = () => {

    const [initializing, setInitializing] = useState(true);
    const [user, setUser] = useState()
    const [role, setRole] = useState("")

    //Owner states
    const [ownerName, setOwnerName] = useState("")
    const [telephoneNumberOwner, setTelephoneNumberOwner] = useState("")
    const [companyName, setCompanyName] = useState("")
    const [streetName, setStreetName] = useState("")
    const [houseNumber, setHouseNumber] = useState("")
    const [houseNumberAddition, setHouseNumberAddition] = useState("")
    const [zipCode, setZipcode] = useState("")
    const [city, setCity] = useState("")
    const [lat, setLat] = useState("")
    const [lng, setLng] = useState("")

    const [hasFilledIn, setHasFilledIn] = useState(false)

    function onAuthStateChanged(user) {
        setUser(user);
        if (initializing) setInitializing(false);
    }

    function getRole() {
        firebase.database().ref('roles').child(user.uid).child('role').once('value').then(snapshot => {
            setRole(snapshot.val())
            console.log("role:" + role)
            console.log("hehe")
        })
    }

    function getDetails(){
        firebase.database().ref('companies').child(user.uid).once('value').then(snapshot => {
            console.log(snapshot.val())
            if(snapshot.val().lat == ""){
                setHasFilledIn(false)
            } else {
                setHasFilledIn(true)
            }
        })
    }

    useEffect(() => {
        const subscriber = firebase.auth().onAuthStateChanged(onAuthStateChanged);
        return subscriber; // unsubscribe on unmount
    }, []);

    if (initializing) return null;

    getRole()

    if (role == "visitor") {
        return (
            <View style={styles.container}>
                <Text style={styles.text}>
                    Welkom {user.email} met als {role} Uw gegevens
            </Text>
            </View>
        )
    } else {
        getDetails()

        if(hasFilledIn) {
            return(
                <View style={styles.container}>
                    <Text style={styles.text}>
                        Alles ingevuld!
                    </Text>
                </View>
            )
        } else {
            return (
                <View style={styles.container}>
                    <Text style={styles.text}>
                        {user.email} {role} U heeft uw horecagelegnheid nog niet aangemeld, vul onderstaande gegevens in om aan te melden.
                    </Text>
                    <TextInput style={styles.input} placeholder="Naam contactpersoon" onChangeText={(ownerName) => {
                        setOwnerName(ownerName)
                    }} value={ownerName} />
                    <TextInput style={styles.input} placeholder="Telefoon contactpersoon" onChangeText={(telephoneNumberOwner) => {
                        setTelephoneNumberOwner(telephoneNumberOwner)
                    }} value={telephoneNumberOwner} />
                    <TextInput style={styles.input} placeholder="Naam horecagelegenheid" onChangeText={(companyName) => {
                        setCompanyName(companyName)
                    }} value={companyName} />
                    <TextInput style={styles.input} placeholder="Straat" onChangeText={(streetName) => {
                        setStreetName(streetName)
                    }} value={streetName} />
                    <TextInput style={styles.input} placeholder="Huisnummer" onChangeText={(houseNumber) => {
                        setHouseNumber(houseNumber)
                    }} value={houseNumber} />
                    <TextInput style={styles.input} placeholder="Toevoeging" onChangeText={(houseNumberAddition) => {
                        setHouseNumberAddition(houseNumberAddition)
                    }} value={houseNumberAddition} />
                    <TextInput style={styles.input} placeholder="Postcode" onChangeText={(zipCode) => {
                        setZipcode(zipCode)
                    }} value={zipCode} />
                    <TextInput style={styles.input} placeholder="Plaats" onChangeText={(city) => {
                        setCity(city)
                    }} value={city} />
                    <TouchableOpacity onPress={() => {
                        const url = "https://geocode.search.hereapi.com/v1/geocode?q=" + streetName + "+" + houseNumber + "+" + houseNumberAddition + "+" + zipCode + "+" + city + "%2C+Netherlands&apiKey=" + key.keys.key
                        fetch(url)
                            .then(res => res.json())
                            .then((resJson) => {
                                setLat(resJson.items[0].access[0].lat)
                                setLng(resJson.items[0].access[0].lng)
                                console.log(lat)
                                console.log(lng)
                            })
                        firebase.database().ref('companies/' + user.uid).set({
                            companyName: companyName,
                            ownerName: ownerName,
                            telephoneNumberOwner: telephoneNumberOwner,
                            streetName: streetName,
                            houseNumber: houseNumber,
                            houseNumberAddition: houseNumberAddition,
                            zipCode: zipCode,
                            city: city,
                            lat: lat,
                            lng: lng,
                        })
                    }}>
                        <Text>Meld aan</Text>
                    </TouchableOpacity>
                </View>
            )  
        }
    }
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
        fontWeight: "500",
        textAlign: 'center'
    },
    input: {
        borderWidth: 1,
        padding: 10,
        margin: 5,
        width: 200
    },
})