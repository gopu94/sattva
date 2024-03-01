/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useEffect } from 'react';
import {

  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import Router from './src/Routes/Router';

import SplashScreen from 'react-native-splash-screen';
import { SafeAreaView } from 'react-native-safe-area-context';



function App(): React.JSX.Element {
  useEffect(() => {
    SplashScreen.hide();

  }, []);

  return (
    <SafeAreaView style={{ flex: 1 }} >
      <Router />
      {/* <StackRoutes /> */}
      {/* <TabNavigation /> */}
    </SafeAreaView>
  );
}


export default App;
