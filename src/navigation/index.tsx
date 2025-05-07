import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { Image, Text, TouchableOpacity, View, StyleSheet } from 'react-native';

import { Home } from './screens/Home';
import Profile from './screens/Profile';
import { Settings } from './screens/Settings';
import { Updates } from './screens/Updates';
import SequenceMemory from './screens/SequenceMemory';
import ReactionTime from './screens/ReactionTime';
import NumberMemory from './NumberMemory';
import Chaintest from './screens/Chaintest';
import Login from './Login';
import { Register } from './screens/Register';
import Results from './screens/Results';
import { NotFound } from './screens/NotFound';
import { RootStackParamList } from './types';


import bell from '../assets/bell.png';

const Drawer = createDrawerNavigator();

const Stack = createNativeStackNavigator<RootStackParamList>();

function DrawerNavigator() {
  return (
    <Drawer.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: '#1976D2',
        },
        headerTintColor: '#fff',
        drawerActiveTintColor: '#fff',
        drawerInactiveTintColor: '#ccc',
        drawerActiveBackgroundColor: '#1565C0',
        drawerStyle: {
          backgroundColor: '#1976D2',
        },
      }}
    >
      <Drawer.Screen name="Home" component={Home} />
      <Drawer.Screen name="ReactionTime" component={ReactionTime} />
      <Drawer.Screen name="SequenceMemory" component={SequenceMemory} />
      <Drawer.Screen name="NumberMemory" component={NumberMemory} />
      <Drawer.Screen name="Chaintest" component={Chaintest} />
      <Drawer.Screen name="Results" component={Results} />
      <Drawer.Screen name="Profile" component={Profile} />
      
    </Drawer.Navigator>
  );
}


export function Navigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
        <Stack.Screen name="Register" component={Register} options={{ headerShown: false }} />
        <Stack.Screen name="Drawer" component={DrawerNavigator} options={{ headerShown: false }} />
        <Stack.Screen name="NotFound" component={NotFound} options={{ title: '404' }} />
        <Stack.Screen name="Profile" component={Profile} options={{ title: 'Profile' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
