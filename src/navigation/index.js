import React from 'react';
import { Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomePage from '../pages/HomePage';
import Favorites from '../pages/Favorites';
import NewsDetail from '../pages/NewsDetail';
import Icon from 'react-native-vector-icons/FontAwesome';
import NewsSource from '../pages/NewsSource';
import SplashScreen from '../pages/SplashScreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const MainTabNavigator = () => {
  return (
    <Tab.Navigator
      initialRouteName="News"
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'News') {
            iconName = 'newspaper-o';
            color = focused ? '#007bff' : '#BBBBBB';
          } else if (route.name === 'Favorites') {
            iconName = focused ? 'star' : 'star-o';
            color = focused ? 'gold' : '#BBBBBB';
          }

          return <Icon name={iconName} size={size} color={color} />;
        },
        tabBarLabel: ({ focused, color }) => {
          let label;

          if (route.name === 'News') {
            label = 'News';
            color = focused ? '#007bff' : '#BBBBBB';
          } else if (route.name === 'Favorites') {
            label = 'Favorites';
            color = focused ? 'gold' : '#BBBBBB';
          }

          return <Text style={{ color }}>{label}</Text>;
        },
        tabBarActiveTintColor: 'gold',
        tabBarInactiveTintColor: '#888888',
      })}
    >
      <Tab.Screen
        name="News"
        component={HomePage}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="Favorites"
        component={Favorites}
        options={{ headerShown: false }}
      />
    </Tab.Navigator>
  );
};

export default function Navigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="SplashScreen"
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="HomeTabs" component={MainTabNavigator} />
        <Stack.Screen name="NewsDetail" component={NewsDetail} />
        <Stack.Screen name="NewsSource" component={NewsSource} />
        <Stack.Screen name="SplashScreen" component={SplashScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
