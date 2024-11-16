import { Ionicons } from '@expo/vector-icons';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { ActivityIndicator, Alert, Dimensions, Image, ImageBackground, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import * as Location from 'expo-location';

const MainScreen = ({ route, navigation }: { navigation: any, route: any }) => {
    console.log(route.params);
    const [searchValue, setSearchValue] = useState();
    console.log(searchValue);
    const [country, setCountry] = useState('');
    const [name, setName] = useState('');
    const [temp, setTemp] = useState('');
    const [text, setText] = useState('');
    const [loading, setLoading] = useState(false);
    const [lat, setLat] = useState(0);
    const [long, setLong] = useState(0);
    const [searchInput, setSearchInput] = useState('India');

    function handleSearchNavigation() {
        navigation.navigate("Search");
    }

    useEffect(() => {
        async function getWeatherInfo() {
            setLoading(true);
            try {
                const response = await axios.get(`https://api.weatherapi.com/v1/current.json?key=43b5b08453fb4d979ff154052243110&q=${searchInput}`);
                setCountry(response.data.location.country);
                setName(response.data.location.name);
                setTemp(response.data.current.temp_c);
                setText(response.data.current.condition.text);

            } catch (e) {
                console.log("error getting weather info ", e);
            }
            setLoading(false);
        }
        getWeatherInfo();
    }, [searchInput]);

    async function handleGetLocation() {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
            Alert.alert('Location Permission', 'Permission to access location was denied');
            return;
        }

        let location = await Location.getCurrentPositionAsync({});
        setLat(location.coords.latitude);
        setLong(location.coords.longitude);
        updateSearchInput();
    }

    if (route.parmas !== undefined) {
        setSearchValue(route.parmas.inputValue);

    }

    function updateSearchInput() {
        setSearchInput(`${lat},${long}`);
    }

    if (loading) {
        return (
            <SafeAreaProvider>
                <SafeAreaView style={{ flex: 1, justifyContent: 'center' }}>
                    <ActivityIndicator />
                </SafeAreaView>
            </SafeAreaProvider>
        )
    }

    return (
        <View style={styles.mainContainer}>
            <Image
                source={require('../assets/bgImage.png')}
                style={{ height: '127%' }}
                resizeMode="cover"
            />
            <View style={styles.tempView}>
                <Text style={styles.tempViewCountry}>{country}</Text>
                <Text style={styles.tempViewName}>{name}</Text>
                <Text style={styles.tempViewTemp}>{temp}°</Text>
                <Text style={styles.tempViewSubtitle}>{text}</Text>
            </View>
            <Image
                source={require('../assets/house.png')}
                style={styles.house}
            />
            <View style={styles.bottomNav}>
                <Pressable onPress={handleGetLocation} style={styles.bottomNavLeft}>
                    <Ionicons name='location-sharp' size={20} color={'white'} />
                    <Text style={styles.bottomNavText}>Location</Text>
                </Pressable>
                <Pressable onPress={handleSearchNavigation} style={styles.bottomNavLeft}>
                    <Ionicons name='search-sharp' size={20} color={'white'} />
                    <Text style={styles.bottomNavText}>Search</Text>
                </Pressable>
            </View>
        </View>
    );
};

export default MainScreen;

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        position: 'relative'
    },
    house: {
        position: 'absolute',
        alignItems: 'center',
        justifyContent: 'center',
        bottom: 47,
        right: 10
    },
    bottomNav: {
        position: 'absolute',
        backgroundColor: '#262C51',
        width: '100%',
        bottom: 0,
        flexDirection: 'row',
        justifyContent: 'space-around',
        paddingVertical: 16
    },
    bottomNavLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8
    },
    bottomNavText: {
        fontSize: 19,
        color: 'white'
    },
    tempView: {
        position: 'absolute',
        top: 100,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    tempViewName: {
        color: 'white',
        fontSize: 60,

    },
    tempViewCountry: {
        color: 'white',
        fontSize: 80,
    },
    tempViewTemp: {
        color: 'white',
        fontSize: 122,
        paddingLeft: 44
    },
    tempViewSubtitle: {
        color: "#ccc",
        fontSize: 25
    }
})