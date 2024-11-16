import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import MainScreen from './screens/MainScreen';
import SearchScreen from './screens/SearchScreen';
import React from 'react';
import { Ionicons } from '@expo/vector-icons'

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <>
      <StatusBar style="light" translucent backgroundColor="transparent" />
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName='Home'

        >
          <Stack.Screen
            name='Home'
            component={MainScreen}
            options={{
              headerShown: true,
              headerTransparent: true,
              animation: "fade_from_bottom",
              contentStyle: {
                backgroundColor: '#1C1B33',
                elevation: 8
              }
            }}
          />
          <Stack.Screen
            name='Search'
            component={SearchScreen}
            options={{
              title: 'Weather',
              animation: 'fade_from_bottom',
              headerRight: () => (
                <Ionicons name='bookmarks-outline' size={24} color={'white'} />
              ),
              headerStyle: {
                backgroundColor: '#2e335a',
              },
              headerTitleStyle: {
                color: 'white'
              },
              headerTintColor: 'white',
              contentStyle: {
                backgroundColor: '#2e335a'
              }
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}

