import React, {useEffect, useState} from 'react';
import {
  FlatList,
  Text,
  View,
  Image,
  ImageBackground,
  StyleSheet,
} from 'react-native';
import {PermissionsAndroid} from 'react-native';
import RNFS from 'react-native-fs';

const Home = () => {
  const [cameraPermission, setCameraPermission] = useState(false);
  const [imageData, setImageData] = useState();
  useEffect(() => {
    checkPermissions();
    const FILE_PATH = RNFS.DocumentDirectoryPath + '/data.json';
    console.log('file path for json in home', FILE_PATH);
    const isExist = RNFS.exists(FILE_PATH);
    if (isExist) {
      RNFS.readFile(FILE_PATH, 'utf8')
        .then(fileData => {
          if (fileData) {
            console.log('filedattaaaa', fileData);
            setImageData(JSON.parse(fileData));
          }
        })
        .catch(error => console.error('Error reading file:', error));
    }
  }, []);
  useEffect(() => {
    console.log(imageData, 'imagesss');
  }, [imageData]);

  const checkPermissions = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('You can use the location');
      } else {
        console.log('location permission denied');
      }
      const cameraGranted = await PermissionsAndroid.check(
        PermissionsAndroid.PERMISSIONS.CAMERA,
      );
      setCameraPermission(cameraGranted === PermissionsAndroid.RESULTS.GRANTED);
      console.log(cameraGranted, PermissionsAndroid.RESULTS.GRANTED);
      if (cameraGranted !== PermissionsAndroid.RESULTS.GRANTED) {
        try {
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.CAMERA,
            {
              title: 'Camera Permission',
              message: 'App needs access to the camera to use features.',
              buttonNeutral: 'Ask Me Later',
              buttonNegative: 'Cancel',
              buttonPositive: 'OK',
            },
          );
          if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            setCameraPermission(true);
          } else {
            console.warn('Camera permission denied');
          }
        } catch (err) {
          console.error(err);
        }
      }
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <View tyle={{flex: 1}}>
      {cameraPermission && imageData?.length > 0 ? (
        <View>
          <FlatList
            data={imageData}
            renderItem={({item}) => (
              <View style={{margin: 10}}>
                {console.log('item from FlatList', item)}
                <ImageBackground
                  source={{uri: `file://${item.uri}`}}
                  // style={{width: '100%', height: 200}}
                  style={styles.backgroundImage}>
                  <View style={styles.overlay}>
                    <Text style={styles.topLeftText}>{item.date}</Text>
                    <Text style={styles.bottomLeftText}>{item.country}</Text>
                    <Text style={styles.bottomRightText}>{item.temp}</Text>
                  </View>
                </ImageBackground>
              </View>
            )}
            keyExtractor={(item, index) => index.toString()}
          />
        </View>
      ) : (
        <Text>Please allow camera permissions for using the app</Text>
      )}
    </View>
  );
};

export default Home;
const styles = StyleSheet.create({
  backgroundImage: {
    height: 300,
    width: 'auto',
  },
  overlay: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    backgroundColor: 'rgba(0,0,0,0.5)', // Overlay color
  },
  topLeftText: {
    position: 'absolute',
    top: 20,
    left: 20,
    color: 'white',
    fontSize: 20,
  },
  bottomLeftText: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    color: 'white',
    fontSize: 20,
  },
  bottomRightText: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    color: 'white',
    fontSize: 20,
  },
});
