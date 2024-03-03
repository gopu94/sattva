/* eslint-disable prettier/prettier */
import React, {useEffect, useState, Button} from 'react';
import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';

import AppHeader from '../components/AppHeader';
import TabNavigation from './TabNavigation';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import ImageEditScreen from '../screens/ImageEditScreen';

const Router = () => {
  const Stack = createNativeStackNavigator();
  return (
    <NavigationContainer>
      <AppHeader />
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="MainTabs" component={TabNavigation} />
        <Stack.Screen name="ImageScreens" component={ImageEditScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Router;
