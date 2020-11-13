import React, { useState, useEffect } from 'react';
import { View, Text, StatusBar, SafeAreaView, ScrollView, Dimensions, StyleSheet, TouchableOpacity } from 'react-native'

import * as firebase from 'firebase'
import apiKeys from './config/keys'

// import HomeNavigator from './routes/homestack'
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';

import Register from './screensOld/home/register'

firebase.initializeApp(apiKeys)




// const Drawer = createDrawerNavigator();

const App = () => {

  // const [initializing, setInitializing] = useState(true);
  // const [user, setUser] = useState();

  // function onAuthStateChanged(user) {
  //   setUser(user);
  //   if (initializing) setInitializing(false);
  // }

  // useEffect(() => {
  //   const subscriber = firebase.auth().onAuthStateChanged(onAuthStateChanged);
  //   return subscriber; // unsubscribe on unmount
  // }, []);

  // if (initializing) return null;

  // const [role, setRole] = useState("")

  // const { width, height } = Dimensions.get('window');
  // console.log(role)

  // if (role == "") {
  //   return (
  //     <>
  //       <StatusBar barStyle="dark-content" />
  //       <SafeAreaView style={{ flex: 1 }}>
  //         <ScrollView
  //           style={{ flex: 1 }}
  //           horizontal={true}
  //           scrollEventThrottle={16}
  //           pagingEnabled={true}
  //         >
  //           <View style={{ width, height }}>
  //             <View style={styles.container}>
  //               <Text>Welkom!</Text>
  //             </View>
  //           </View>
  //           <View style={{ width, height }}>
  //             <View style={styles.container}>
  //               <TouchableOpacity name="visitor" onPress={() => { setRole("visitor") }}><Text>Bezoeker</Text></TouchableOpacity>
  //               <TouchableOpacity name="owner" onPress={() => { setRole("owner") }}><Text>Ondernemer</Text></TouchableOpacity>
  //             </View>
  //           </View>
  //         </ScrollView>
  //       </SafeAreaView>
  //     </>
  //   )
  // } else if (role == "visitor") {
  //   return (
  //     <NavigationContainer>
  //       <Drawer.Navigator>
  //         <Drawer.Screen name="Register" component={Register} />
  //       </Drawer.Navigator>
  //     </NavigationContainer>
  //   )
  // } else if (role == "owner") {
  //   return (
  //     <NavigationContainer>
  //       <Drawer.Navigator>
  //         <Drawer.Screen name="Register" component={Register} />
  //       </Drawer.Navigator>
  //     </NavigationContainer>
  //   )
  // }

  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();

  // Handle user state changes
  function onAuthStateChanged(user) {
    setUser(user);
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = firebase.auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  if (initializing) return null;

  if (!user) {
    return (
      <View>
        <Text>Login</Text>
      </View>
    );
  }

  return (
    <View>
      <Text>Welcome {user.email}</Text>
    </View>
  );
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
  }
})