import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, FlatList, Dimensions } from 'react-native'
import { SearchBar } from 'react-native-elements'
import { TouchableOpacity } from 'react-native-gesture-handler';

//navigation imports
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

//map and location import
import MapView, { Marker, Callout } from 'react-native-maps';
import * as Location from 'expo-location';
import * as geolib from 'geolib';

//import database
import * as firebase from 'firebase'

//window width
const windowWidth = Dimensions.get('window').width;

const CloseBy = () => {

    //location states
    const [location, setLocation] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);
    const [lat, setLat] = useState();
    const [lng, setLng] = useState();
    const [hasLocation, setHasLocation] = useState(false)
    const [coords, setCoords] = useState()

    //Filter options states
    const [distance, setDistance] = useState(5000);

    //company array
    const companies = []

    //tab navigator
    const Tab = createBottomTabNavigator();

    firebase.database().ref('companies').on('child_added', snapshot => {
        companies.push(snapshot.val())
        console.log(companies)
    })

    useEffect(() => {
        (async () => {
            let { status } = await Location.requestPermissionsAsync();
            if (status !== 'granted') {
                setErrorMsg('Permission to access location was denied');
            }

            let location = await Location.getCurrentPositionAsync({});
            setLocation(location);
            setCoords(location.coords)
            setLat(location.coords.latitude)
            setLng(location.coords.longitude)
            setHasLocation(true)
        })();
    }, []);

    let text = 'Laden..';
    if (errorMsg) {
        text = errorMsg;
    } else if (location) {
        text = JSON.stringify(location.coords);
    }

    function ListDisplay() {
        if (hasLocation) {
            console.log(distance)
            console.log(companies + 'hehehe')
            return (
                <View style={styles.container}>
                    <View style={styles.container}>
                        <FlatList
                            ListHeaderComponent={renderHeader}
                            data={companies}
                            renderItem={({ item }) => {
                                const dist = geolib.getDistance(
                                    { latitude: lat, longitude: lng },
                                    { latitude: item.lat, longitude: item.lng }
                                );
                                if (dist < distance) {
                                    console.log(companies.companyName + 'hehehe')
                                    return (
                                        <View style={styles.card}>
                                            <Text>{item.companyName}</Text>
                                            <Text>{(dist / 1000).toFixed(1)}KM van uw locatie</Text>
                                            {dist < 50 ?? <Text>Check in!</Text>}
                                        </View>
                                    )
                                }
                            }}
                            keyExtractor={item => item.companyName}
                        />
                    </View>
                </View>
            )
        } else {
            return (
                <Text>{text}</Text>
            )
        }
    }

    function MapDisplay() {
        console.log(companies)
        if (hasLocation) {
            return (
                <View style={styles.container}>
                    <MapView style={styles.mapStyle} initialRegion={{
                        latitude: lat,
                        longitude: lng,
                        latitudeDelta: 0.01,
                        longitudeDelta: 0.01,
                    }}>
                        {companies.map((company) => {
                            const dist = geolib.getDistance(
                                { latitude: lat, longitude: lng },
                                { latitude: company.lat, longitude: company.lng }
                            )
                            if (dist < 10000) {
                                return (
                                    <Marker key={company.lat}
                                        coordinate={{ latitude: company.lat, longitude: company.lng, }}
                                        title="test"
                                        description="Test">

                                        <Callout style={styles.callOut}>
                                            <Text>{company.companyName}</Text>
                                            <Text>{company.streetName} {company.houseNumber}</Text>
                                            <Text>{(dist / 1000).toFixed(1)}KM van uw locatie</Text>
                                            {dist < 50 ?? <Text>Check in!</Text>}
                                        </Callout>
                                    </Marker>
                                )
                            }
                            else {
                                return null;
                            }
                        }
                        )}
                        <Marker
                            key={1}
                            coordinate={{ latitude: lat, longitude: lng, }}
                            title="IK!"
                            pinColor="blue" />
                    </MapView>
                </View>
            )
        } else {
            return (
                <Text>{text}</Text>
            )
        }
    }

    function renderHeader() {
        return (
            <View style={styles.fitlerOptions}>
                <SearchBar style={styles.search} placeholder="Zoeken" onChangeText={text => searchFilter(text)} autoCorrect={false} />
                <View style={styles.filters}>
                    <TouchableOpacity onPress={() => setDistance(5000)}><Text>5KM</Text></TouchableOpacity>
                    <TouchableOpacity onPress={() => setDistance(10000)}><Text>10KM</Text></TouchableOpacity>
                    <TouchableOpacity onPress={() => setDistance(10000000000)}><Text>10KM+</Text></TouchableOpacity>
                </View>
            </View>
        );
    }

    return (
        <NavigationContainer independent={true}>
            <Tab.Navigator>
                <Tab.Screen name="Lijst" component={ListDisplay} />
                <Tab.Screen name="Map" component={MapDisplay} />
            </Tab.Navigator>
        </NavigationContainer>
    );

}

export default CloseBy

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: windowWidth,
    },
    text: {
        color: "#161924",
        fontSize: 20,
        fontWeight: "500"
    },
    card: {
        paddingVertical: 20,
        borderTopWidth: 1,
        borderColor: '#CED0CE',
        width: windowWidth - 40,
    },
    search: {

    },
    fitlerOptions: {
        width: windowWidth - 40,
        marginTop: 20,
        marginBottom: 10,
        display: "flex",
        flexDirection: "column",
    },
    filters: {
        paddingTop: 20,
        display: "flex",
        flexDirection: "row",
        justifyContent: 'space-between',
    },
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    mapStyle: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
    }

})