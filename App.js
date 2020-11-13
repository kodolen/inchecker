import React, { useState, useEffect } from 'react';
import { View, Text, StatusBar, SafeAreaView, ScrollView, Dimensions, StyleSheet, TouchableOpacity } from 'react-native'

//Database config
import * as firebase from 'firebase'
import apiKeys from './config/keys'

//Drawer navigation
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList, DrawerItem } from '@react-navigation/drawer';

//Import of screens with individual stack navigation
import {
  HomeStackNavigator,
  LogInStackNavigator,
  RegisterStackNavigator,
  ProfileStackNavigator,
  CheckInStackNavigator,
  CloseByStackNavigator,
  LogStackNavigator,
  DashboardStackNavigator
} from './navigation/stacknavigator'


//Create drawer navigator
const Drawer = createDrawerNavigator();

const App = () => {

  const [role, setRole] = useState("")
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();
  const { width, height } = Dimensions.get('window');

  //Initialize database
  if (!firebase.apps.length) {
    firebase.initializeApp(apiKeys.firebaseConfig)
  }

  //Change user function
  function onAuthStateChanged(user) {
    setUser(user);
    if (initializing) {
      setInitializing(false)
    };
  }

  //Change role function
  function changeRole() {
    if (role == "visitor") {
      setRole("owner")
    } else {
      setRole("visitor")
    }
    console.log(role)
  }

  //Get role function
  function getRole() {
    firebase.database().ref('roles').child(user.uid).child('role').once('value').then(snapshot => {
      setRole(snapshot.val())
    })
  }

  //Custom drawer function for custom items (logout and change role)
  function CustomDrawerContent(props) {
    return (
      <DrawerContentScrollView {...props}>
        <DrawerItemList {...props} />
        {user ? <DrawerItem label="Uitloggen" onPress={() => firebase.auth().signOut().then(() => console.log("user signed out!"))} /> : <DrawerItem label="Niet ingelogd" />}
        {!user && <DrawerItem label="Verander rol" onPress={() => changeRole()} />}
      </DrawerContentScrollView>
    );
  }

  useEffect(() => {
    const subscriber = firebase.auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  if (initializing) return null;

  //Intro screen if not logged in op opened app before
  if (!user && role == "") {
    return (
      <>
        <StatusBar barStyle="dark-content" />
        <SafeAreaView style={{ flex: 1 }}>
          <ScrollView
            style={{ flex: 1 }}
            horizontal={true}
            scrollEventThrottle={16}
            pagingEnabled={true}
          >
            <View style={{ width, height }}>
              <View style={styles.container}>
                <Text>Welkom!</Text>
              </View>
            </View>
            <View style={{ width, height }}>
              <View style={styles.container}>
                <TouchableOpacity name="visitor" onPress={() => { setRole("visitor") }}><Text>Bezoeker</Text></TouchableOpacity>
                <TouchableOpacity name="owner" onPress={() => { setRole("owner") }}><Text>Ondernemer</Text></TouchableOpacity>
              </View>
            </View>
          </ScrollView>
        </SafeAreaView>
      </>
    )
  } else {
    if (user) {
      getRole()
    }
    return (
      <NavigationContainer>
        <Drawer.Navigator drawerContent={props => <CustomDrawerContent {...props} />}>
          <Drawer.Screen name="Home" component={HomeStackNavigator} />
          {user && <Drawer.Screen name="Mijn gegevens" component={ProfileStackNavigator} />}
          {role == 'visitor' && <Drawer.Screen name="In mijn buurt" component={CloseByStackNavigator} />}
          {role == 'visitor' && <Drawer.Screen name="Check in" component={CheckInStackNavigator} />}
          {!user && <Drawer.Screen name="Log in" component={LogInStackNavigator} />}
          {!user && <Drawer.Screen name="Registreer" component={RegisterStackNavigator} initialParams={{ post: role }} />}
          {user && role == "visitor" && <Drawer.Screen name="Mijn geschiedenis" component={LogStackNavigator} />}
          {user && role == "owner" && <Drawer.Screen name="Dashboard" component={DashboardStackNavigator} />}
        </Drawer.Navigator>
      </NavigationContainer>
    )
  }
}

export default App

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
  signOut: {
    position: 'absolute',
    bottom: '0'
  }
})