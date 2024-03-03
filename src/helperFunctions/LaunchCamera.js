import {launchCamera} from 'react-native-image-picker';

const options = {
  mediaType: 'photo',
  includeBase64: false,
  maxHeight: 200,
  maxWidth: 200,
};
const LaunchCamera = async navigation => {
  await launchCamera(options, response => {
    if (response.didCancel) {
      console.log('User cancelled camera');
      return;
    } else if (response.error) {
      console.log('Camera Error: ', response.error);
      return;
    } else {
      let imageUri = response.uri || response.assets?.[0]?.uri;
      console.log(imageUri, 'from launchcamera');
      navigation.navigate('ImageScreens', {imageUri: imageUri});
    }
  });
};

export default LaunchCamera;
