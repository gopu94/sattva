import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ImageEditScreen from '../screens/ImageEditScreen';
import AppHeader from '../components/AppHeader';
import { View } from 'react-native';
const StackNavigations = () => {
    const Stack = createNativeStackNavigator();
  return (
    <View style={{flex:1}}><AppHeader isTab={true}/>
<Stack.Navigator
screenOptions={{headerShown:false}}>
    <Stack.Screen name='ImageScreensStack' component={ImageEditScreen} />
    </Stack.Navigator>
    </View>
    )
}

export default StackNavigations