import React from 'react';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome5';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import Home from '../screens/Home';
import Profile from '../screens/Profile';
import Tournament from '../screens/Tournament';
import Events from '../screens/Events';

const Tab = createMaterialBottomTabNavigator();

const BottomTabNavigation = () => {
    
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="home" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="Tournament"
        component={Tournament}
        options={{
          tabBarLabel: 'Tournament',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              name="tournament"
              color={color}
              size={26}
            />
          ),
        }}
      />
        <Tab.Screen
        name="Live"
        component={Events}
        options={{
          tabBarLabel: 'Live',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              name="broadcast"
              color={color}
              size={26}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomTabNavigation;
