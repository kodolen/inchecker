import React from "react";
import { StyleSheet } from 'react-native'
import { createStackNavigator } from "@react-navigation/stack";
import { MaterialIcons } from '@expo/vector-icons'

//shared screens
import Home from '../screens/shared/home'
import LogIn from '../screens/shared/login'
import Register from '../screens/shared/register'
import Profile from '../screens/shared/profile'

//visitor screens
import CheckIn from '../screens/visitor/checkIn'
import CloseBy from '../screens/visitor/closeBy'
import Log from '../screens/visitor/log'

// owner screens
import Dashboard from '../screens/owner/dashboard'

const Stack = createStackNavigator();

const HomeStackNavigator = ({ navigation }) => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Home" component={Home} options={{
                headerRight: () => (
                    <MaterialIcons name='menu' style={styles.icon} onPress={() => navigation.openDrawer()} />
                ),
            }} />
        </Stack.Navigator>
    );
};

const LogInStackNavigator = ({ navigation }) => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Log in" component={LogIn} options={{
                headerRight: () => (
                    <MaterialIcons name='menu' style={styles.icon} onPress={() => navigation.openDrawer()} />
                ),
            }} />
        </Stack.Navigator>
    );
};

const RegisterStackNavigator = ({ navigation, route }) => {
    console.log("dit is: " + route.params.post)
    return (
        <Stack.Navigator>
            <Stack.Screen initialParams={{ post: route.params.post }} name="Registreer" component={Register} options={{
                headerRight: () => (
                    <MaterialIcons name='menu' style={styles.icon} onPress={() => navigation.openDrawer()} />
                ),
            }} />
        </Stack.Navigator>
    );
};

const ProfileStackNavigator = ({ navigation }) => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Mijn gegevens" component={Profile} options={{
                headerRight: () => (
                    <MaterialIcons name='menu' style={styles.icon} onPress={() => navigation.openDrawer()} />
                ),
            }} />
        </Stack.Navigator>
    );
};

const CheckInStackNavigator = ({ navigation }) => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Check in" component={CheckIn} options={{
                headerRight: () => (
                    <MaterialIcons name='menu' style={styles.icon} onPress={() => navigation.openDrawer()} />
                ),
            }} />
        </Stack.Navigator>
    );
};

const CloseByStackNavigator = ({ navigation }) => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="In mijn buurt" component={CloseBy} options={{
                headerRight: () => (
                    <MaterialIcons name='menu' style={styles.icon} onPress={() => navigation.openDrawer()} />
                ),
            }} />
        </Stack.Navigator>
    );
};

const LogStackNavigator = ({ navigation }) => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Mijn geschiedenis" component={Log} options={{
                headerRight: () => (
                    <MaterialIcons name='menu' style={styles.icon} onPress={() => navigation.openDrawer()} />
                ),
            }} />
        </Stack.Navigator>
    );
};

const DashboardStackNavigator = ({ navigation }) => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Dashboard" component={Dashboard} options={{
                headerRight: () => (
                    <MaterialIcons name='menu' style={styles.icon} onPress={() => navigation.openDrawer()} />
                ),
            }} />
        </Stack.Navigator>
    );
};

const styles = StyleSheet.create({
    icon: {
        position: 'absolute',
        right: 16,
        fontSize: 30
    },
})

export { HomeStackNavigator,
         LogInStackNavigator, 
         RegisterStackNavigator, 
         ProfileStackNavigator, 
         CheckInStackNavigator,
         CloseByStackNavigator,
         LogStackNavigator,
         DashboardStackNavigator
        };