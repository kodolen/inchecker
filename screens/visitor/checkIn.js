import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Button, TextInput } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { set } from 'react-native-reanimated';

//import database
import * as firebase from 'firebase'
import { TouchableOpacity } from 'react-native-gesture-handler';

const CheckIn = () => {

  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);

  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();

  const [companyId, setCompanyId] = useState("");

  const [checkEdIn, setCheckEdIn] = useState(false)

  const companies = []

  const [name, setName] = useState("")
  const [telephone, setTelephone] = useState("")

  firebase.database().ref('companies').on('child_added', snapshot => {
    companies.push(snapshot.val())
  })

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
      getSubscriber()
    })();
  }, []);

  function getSubscriber() {
    const subscriber = firebase.auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }

  function onAuthStateChanged(user) {
    setUser(user);
    if (initializing) {
      setInitializing(false)
    };
  }

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    alert(`Bar code with type ${type} and data ${data} has been scanned!`);
    setCompanyId(data)
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  if (initializing) return null;

  if (!scanned) {
    return (
      <View style={styles.container}>
        <BarCodeScanner
          onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
          style={StyleSheet.absoluteFillObject}
        />
        {scanned && <Button title={'Tap to Scan Again'} onPress={() => setScanned(false)} />}
      </View>
    )
  } else {
    var today = new Date(),
      date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    console.log(date)
    for (let company of companies) {
      console.log("hey")
      if (companyId === company.userId) {
        if (user) {
          firebase.database().ref("roles/" + user.uid).once("value").then(snapshot => {
            console.log(snapshot.val())
            setName(snapshot.val().name)
            setTelephone(snapshot.val().telephone)
          })
          if (!checkEdIn) {
            return (
              <View style={styles.container}>
                <Text>U wilt gaan inchecken bij {company.companyName}</Text>
                <TouchableOpacity style={styles.button} onPress={() => {
                  firebase.database().ref("check-ins/" + companyId + "/" + date + "-" + telephone).set({
                    name: name,
                    telephone: telephone,
                    date: date
                  })
                  setCheckEdIn(true)
                }}>
                  <Text style={styles.textButton}>Bevestig inchecken</Text>
                </TouchableOpacity>
              </View>
            )
          } else {
            return (
              <View style={styles.container}>
                <Text>U bent nu ingechecked bij {company.companyName}</Text>
                <Text>Wilt u ergens anders inchecken? check opnieuw in!</Text>
                <TouchableOpacity style={styles.button} onPress={() => {
                  setCheckEdIn(false)
                  setScanned(false)
                }}>
                  <Text style={styles.textButton}>Opnieuw inchecken</Text>
                </TouchableOpacity>
              </View>
            )
          }
        } else {
          return (
            <View style={styles.container}>
              <Text>Log in om in te checken!</Text>
            </View>
          )
        }
      }
    }
  }
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
  },
  input: {
    borderWidth: 1,
    padding: 10,
    margin: 5,
    width: 200
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 40,
    width: 200,
    backgroundColor: "green",
    margin: 5,
  },
  textButton: {
    color: "white"
  }
})