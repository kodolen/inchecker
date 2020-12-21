import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Button, TextInput } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { set } from 'react-native-reanimated';
import * as Location from 'expo-location';
import * as geolib from 'geolib';

import MapView, { Marker, Callout } from 'react-native-maps';

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


  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [lat, setLat] = useState();
  const [lng, setLng] = useState();
  const [hasLocation, setHasLocation] = useState(false)
  const [coords, setCoords] = useState()

  firebase.database().ref('companies').on('child_added', snapshot => {
    companies.push(snapshot.val())
  })

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');

      let { statusl } = await Location.requestPermissionsAsync();
      if (statusl !== 'granted') {
        setErrorMsg('Permission to access location was denied');
      }

      getSubscriber()
    })();
    getLocation()
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

  async function getLocation() {
    Location.watchPositionAsync({
      enableHighAccuracy:true,
      timeInterval: 2000,
      distanceInterval: 0
    }, location => {
      setLocation(location)
      console.log(location)
    })
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

  let text = 'Laden..';
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = JSON.stringify(location.coords);
    console.log(location.coords)
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
    for (let company of companies) {
      if (companyId === company.userId) {
        if (user) {
          firebase.database().ref("roles/" + user.uid).once("value").then(snapshot => {
            setName(snapshot.val().name)
            setTelephone(snapshot.val().telephone)
          })
          if (!checkEdIn) {
            if (!hasLocation) {
              const dist = geolib.getDistance(
                { latitude: location.coords.latitude, longitude: location.coords.longitude },
                { latitude: company.lat, longitude: company.lng }
              )
              if (dist < 50) {
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
                    <MapView style={styles.mapStyle} initialRegion={{
                      latitude: location.coords.latitude,
                      longitude: location.coords.longitude,
                      latitudeDelta: 0.01,
                      longitudeDelta: 0.01,
                    }}>
                      <Marker
                        key={1}
                        coordinate={{ latitude: location.coords.latitude, longitude: location.coords.longitude, }}
                        title="IK!"
                        pinColor="blue" />
                      <Marker
                        key={2}
                        coordinate={{ latitude: company.lat, longitude: company.lng, }}
                        title="IK!"
                        pinColor="red" />

                    </MapView>
                    <Text>U bent niet binnen 50 meter van de horecagelegenheid. Verplaats u naar de horecalegenheid of scan een nieuwe QR code</Text>
                    <TouchableOpacity style={styles.button} onPress={() => {
                      setCheckEdIn(false)
                      setScanned(false)
                    }}>
                      <Text style={styles.textButton}>Opnieuw scannen</Text>
                    </TouchableOpacity>
                  </View>
                )
              }

            }
            else {
              return (
                <View><Text>Geen locatie bekend!</Text></View>
              )
            }
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
    alignItems: 'center',
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
  },
  mapStyle: {
    width: 200,
    height: 200,
  }
})