import React, { useEffect, useState } from 'react'
import { Text, View } from 'react-native'
import { PermissionsAndroid } from 'react-native'
const Home = () => {
  const [cameraPermission, setCameraPermission] = useState(false)
  useEffect(() => {
    checkPermissions()
  }, [])

  const checkPermissions = async () => {
    try {
      const cameraGranted = await PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.CAMERA);
      setCameraPermission(cameraGranted === PermissionsAndroid.RESULTS.GRANTED);
      console.log(cameraGranted, PermissionsAndroid.RESULTS.GRANTED)
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
            }
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
    <View>
      {cameraPermission ?
        <Text>Home</Text>
        :
        <Text>please allow camera permissions for using app </Text>
      }
    </View>
  )
}

export default Home