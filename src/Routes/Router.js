/* eslint-disable prettier/prettier */
import React, { useEffect, useState ,Button} from 'react';
import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';

import AppHeader from '../components/AppHeader';
import Home from '../screens/Home';
import Summary from '../screens/Summary';
import Icon from 'react-native-remix-icon';
import TabNavigation from './TabNavigation';
import StackNavigations from './StackNavigations';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Router = () => {
 
  const Stack = createNativeStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown:false}}>
      <Stack.Screen name="MainTabs" component={TabNavigation} />
      <Stack.Screen name="ImageScreens" component={StackNavigations} />
    </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Router;
const styles = StyleSheet.create({
  addButtonContainer: {
    position: 'absolute',
    bottom: 15,
    left: 0,
    right: 0,
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  addButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
