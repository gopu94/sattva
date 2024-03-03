import React, {useEffect, useState} from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import AppHeader from '../components/AppHeader';
import Home from '../screens/Home';
import Summary from '../screens/Summary';
import Icon from 'react-native-remix-icon';
import LaunchCamera from '../components/LaunchCamera';

const TabNavigation = ({navigation}) => {
  const Tab = createBottomTabNavigator();

  return (
    <View style={{flex: 1}}>
      {/* <AppHeader /> */}
      <Tab.Navigator
        screenOptions={({route}) => ({
          headerShown: false,
          tabBarShowLabel: false,
          tabBarIcon: ({focused, color, size}) => {
            let iconName;

            if (route.name === 'Home') {
              iconName = focused ? 'home-line' : 'home-fill';
            } else if (route.name === 'Summary') {
              iconName = focused ? 'information-line' : 'information-fill';
            }

            return <Icon name={iconName} size={size} color={color} />;
          },
        })}>
        <Tab.Screen name="Home" component={Home} />
        <Tab.Screen name="Summary" component={Summary} />
      </Tab.Navigator>
      <View style={styles.addButtonContainer}>
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => LaunchCamera(navigation)}>
          <Icon name="add-line" size={50} color="blue" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default TabNavigation;
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
