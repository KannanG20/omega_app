import { View, Text } from 'react-native'
import React from 'react'
import DrawerNavigation from './DrawerNavigation';
import { createStackNavigator } from '@react-navigation/stack';
import Whitelist from '../screens/Whitelist';
import Suggestion from '../screens/Suggestion';
import Report from '../screens/Report';
import Profile from '../screens/Profile';
import Stats from '../screens/Stats';

const Stack = createStackNavigator();

const MainStackNavigation = () => {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen name="Initial" component={DrawerNavigation} options={{ headerShown: false }}/>
      <Stack.Screen name="Profile" component={Profile} />
      <Stack.Screen name="Stats" component={Stats} />
      <Stack.Screen name="Whitelist Info" component={Whitelist} />
      <Stack.Screen name="Suggestion" component={Suggestion} />
      <Stack.Screen name="Report" component={Report} />
    </Stack.Navigator>
  )
}

export default MainStackNavigation