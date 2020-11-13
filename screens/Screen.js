import React from 'react'
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity } from 'react-native'
import { FontAwesome5 } from '@expo/vector-icons'
import { ScreenStack } from 'react-native-screens'

import Old from '../screensOld/home/register'

export default class Screen extends React.Component {
    render(){
        return (

                    <TouchableOpacity
                        style={{ position:'absolute', left:0, right:0 }}
                        onPress={this.props.navigation.openDrawer}>
                        <FontAwesome5 name="bars" size={24} color="#161924" />
                    </TouchableOpacity>
 
        )
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FFF"
    },
    text: {
        color: "#161924",
        fontSize: 20,
        fontWeight: "500"
    }
})

// export default Screen;