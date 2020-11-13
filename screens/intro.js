import React from 'react';
import { View, Text, StatusBar, SafeAreaView, ScrollView, Dimensions, StyleSheet, TouchableOpacity } from 'react-native'

const Intro = (props) => {

    const { width, height } = Dimensions.get('window');

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
                            <TouchableOpacity name="visitor" onPress={log}><Text>Bezoeker</Text></TouchableOpacity>
                            <TouchableOpacity name="owner" onPress={log}><Text>Ondernemer</Text></TouchableOpacity>
                        </View>
                    </View>
                </ScrollView>
            </SafeAreaView>
        </>
    );
}

function log(){
    this.props.test
}

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

export default Intro