import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomePage from '../pages/HomePage';
import Favorites from '../pages/Favorites';
import NewsDetail from '../pages/NewsDetail';
import Icon from 'react-native-vector-icons/FontAwesome';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const MainTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'News') {
            iconName = focused ? 'newspaper-o' : 'newspaper-o';
          } else if (route.name === 'Favorites') {
            iconName = focused ? 'star' : 'star-o';
          }

          return <Icon name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="News" component={HomePage} />
      <Tab.Screen name="Favorites" component={Favorites} />
    </Tab.Navigator>
  );
};

export default function Navigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="HomeTabs"
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="NewsDetail" component={NewsDetail} />
        <Stack.Screen
          name="HomeTabs"
          component={MainTabNavigator}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
