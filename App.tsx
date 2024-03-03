/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useEffect} from 'react';

import Router from './src/Routes/Router';

import SplashScreen from 'react-native-splash-screen';
import {SafeAreaView} from 'react-native-safe-area-context';

function App(): React.JSX.Element {
  useEffect(() => {
    SplashScreen.hide();
  }, []);

  return (
    <SafeAreaView style={{flex: 1}}>
      <Router />
    </SafeAreaView>
  );
}

export default App;
