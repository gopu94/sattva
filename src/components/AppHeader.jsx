import React from 'react';
import {View, Image, StyleSheet, TouchableOpacity} from 'react-native';
import logo from '../assets/clickaday_logo.png';
import Icon from 'react-native-remix-icon';
import {useNavigation} from '@react-navigation/native';
const AppHeader = ({isTab = false}) => {
  const navigation = useNavigation();
  return (
    <View style={styles.headerContainer}>
      {isTab && (
        <TouchableOpacity
          style={styles.arrowContainer}
          onPress={() => navigation.navigate('Home')}>
          <Icon name="arrow-left-s-line" size={30} />
        </TouchableOpacity>
      )}
      <Image source={logo} style={styles.logoImage} />
    </View>
  );
};

export default AppHeader;
const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    backgroundColor: 'white',
  },
  arrowContainer: {
    position: 'absolute',
    top: 20,
    left: 5,
  },
  logoImage: {
    width: 205,
    height: 50,
    resizeMode: 'contain',
  },
});
