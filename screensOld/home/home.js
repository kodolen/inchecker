import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button, TextInput, TouchableOpacity } from 'react-native';

import Header from '../../components/header/header'

import * as firebase from 'firebase'
import apiKeys from '../../config/keys'

const Home = ({ navigation }) => {

  const [email, setEmail] = useState(" ")
  const [password, setPassword] = useState(" ")
  const [confirmPassword, setConfirmPassword] = useState(" ")

  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();

  function onAuthStateChanged(user) {
    setUser(user);
    console.log("test")
    if (initializing) {
      setInitializing(false)
    };
  }

  useEffect(() => {
    const subscriber = firebase.auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  if (initializing) return null;

  if (!user) {
    return (
      <View style={styles.topContainer}>
        <Text>Login</Text>
      </View>
    );
  } else {

    return (
      <View>
        <Text>Welcome {user.email}</Text>
        <TouchableOpacity onPress={() => {
          firebase.auth()
            .signOut()
            .then(() => console.log("user signed out!"))
        }}>
          <Text>Log uit</Text>
        </TouchableOpacity>
      </View>
    );

  }

  // return (
  //   <View style={styles.container}>
  //     <Text>Log in</Text>
  //     <TextInput style={styles.input} placeholder="Email" />
  //     <TextInput style={styles.input} placeholder="Wachtwoord" secureTextEntry={true} />
  //     <TouchableOpacity style={styles.buttonLogin} title="Log in"><Text style={styles.buttonText}>Log in</Text></TouchableOpacity>
  //     <Text style={styles.link} onPress={() => navigation.navigate("forgotPassword")}>Wachtwoord vergeten</Text>
  //     <Text>Nog geen account?</Text>
  //     <TouchableOpacity style={styles.buttonRegister} onPress={() => navigation.navigate("register")}><Text style={styles.buttonText}>Registreren</Text></TouchableOpacity>
  //   </View>
  // )

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  topContainer: {
    flex: 1,
    height: 10,
    justifyContent: "flex-end",
    backgroundColor: "red"
  },
  input: {
    borderWidth: 1,
    padding: 10,
    margin: 5,
    width: 200
  },
  link: {
    color: 'blue',
    paddingBottom: 40
  },
  buttonLogin: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 40,
    width: 200,
    backgroundColor: "green",
    margin: 5,
  },
  buttonRegister: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 40,
    width: 200,
    backgroundColor: "blue",
    margin: 5,
  },
  buttonText: {
    color: 'white'
  },
});

export default Home