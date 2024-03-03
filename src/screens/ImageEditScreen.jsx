import React, {useEffect, useState, useRef} from 'react';
import {Image, Text, TouchableOpacity, View} from 'react-native';

const ImageEditScreen = ({route}) => {
  const [imagePath, setImagePath] = useState();
  const [showCamera, setShowCamera] = useState(false);
  const {imageUri} = route.params;
  console.log(route, 'routeeeeeee');
  useEffect(() => {}, []);

  return (
    <View>
      <Text>ImageEditScreen</Text>
      <Image source={{uri: imageUri}} style={{width: 200, height: 200}} />
    </View>
  );
};

export default ImageEditScreen;
