import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomePage from '../pages/HomePage';
import Favorites from '../pages/Favorites';
import NewsDetail from '../pages/NewsDetail';
import Icon from 'react-native-vector-icons/FontAwesome';
import NewsSource from '../pages/NewsSource';


const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const MainTabNavigator = () => {
  return (
    <Tab.Navigator
      initialRouteName="News"
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          let iconColor;

          if (route.name === 'News') {
            iconName = focused ? 'newspaper-o' : 'newspaper-o';
            iconColor = color;
          } else if (route.name === 'Favorites') {
            iconName = focused ? 'star' : 'star-o';
            iconColor = focused ? 'gold' : 'grey';
          }

          return <Icon name={iconName} size={size} color={iconColor} />;
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
        <Stack.Screen name="HomeTabs" component={MainTabNavigator} />
        <Stack.Screen name="NewsDetail" component={NewsDetail} />
        <Stack.Screen name="NewsSource" component={NewsSource} />

      </Stack.Navigator>
    </NavigationContainer>
  );
}
