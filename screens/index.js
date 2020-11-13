import React from 'react'
import Screen from './Screen'

import Register from '../screensOld/home/register'

const len = false
console.log(len)


export const HomeScreen = ({ navigation }) => <Register><Screen navigation={navigation} name="Home"/></Register>
export const HoodScreen = ({ navigation }) => <Screen navigation={navigation} name="Hood" />
export const CheckInScreen = ({ navigation }) => <Screen navigation={navigation} name="CheckIn" />
export const LogInScreen = ({ navigation }) => <Screen navigation={navigation} name="LogIn" />
export const LogOutScreen = ({ navigation }) => <Screen navigation={navigation} name="LogOut" />

