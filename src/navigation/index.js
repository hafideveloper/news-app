import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import HomePage from '../pages/HomePage'
import Favorites from '../pages/Favorites'
import NewsDetail from '../pages/NewsDetail'

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

export default function Navigation() {
    const TabNavigator = () => {
        return(
            <Tab.Navigator>
                <Tab.Screen name="HomePage" component={HomePage} />
                <Tab.Screen name="Favorites" component={Favorites} />
            </Tab.Navigator>
        );
    };

  return (
    <NavigationContainer>
        <Stack.Navigator
            initialRouteName='HomePage' 
            screenOptions={{
                headerShown: false,
            }}
            >
            <Stack.Screen name="HomePage" component={HomePage} />
            <Stack.Screen name="NewsDetail" component={NewsDetail} />
            <Stack.Screen name="HomeTabs" component={TabNavigator} />
        </Stack.Navigator>
    </NavigationContainer>
  );
}