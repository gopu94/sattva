import React, {useEffect, useState, useRef} from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import RNFS from 'react-native-fs';
import GetImageData from '../helperFunctions/GetImageData';
import Icon from 'react-native-remix-icon';
import AppHeader from '../components/AppHeader';

const ImageEditScreen = ({route}) => {
  const {imageUri} = route.params;
  const [dataJSON, setdataJSON] = useState([]);
  const [image, setImage] = useState();
  const [text, setText] = useState('');
  const fileName = RNFS.DocumentDirectoryPath;
  console.log(route.params, 'routeeeeeee');
  console.log('file name from imageeditscreen', fileName);
  useEffect(() => {
    if (Object.keys(dataJSON).length > 0) saveJSON();
  }, [dataJSON]);

  const SaveImage = async () => {
    try {
      const imagePath = `${fileName}/${Date.now()}.jpg`;
      console.log(imagePath, 'imagepathhss');
      await RNFS.moveFile(imageUri, imagePath);
      const currentDate = new Date();
      const options = {month: 'short', day: '2-digit'};
      const formattedDate = currentDate.toLocaleDateString('en-US', options);
      GetImageData().then(data => {
        console.log('Data:', data);
        setdataJSON({
          uri: imagePath,
          text: text,
          temp: data.temp,
          city: data.city,
          country: data.country,
          date: formattedDate,
        });
      });
      setImage(imagePath);
    } catch (err) {
      console.log(err, 'save image error');
    }
  };
  const saveJSON = async () => {
    const filePath = fileName + '/data.json';
    try {
      const isFileExists = await RNFS.exists(filePath);
      if (isFileExists) {
        const existingData = await RNFS.readFile(filePath, 'utf8');
        const parsedData = JSON.parse(existingData);
        const updatedData = [...parsedData, dataJSON];
        await RNFS.writeFile(filePath, JSON.stringify(updatedData), 'utf8');
      } else {
        // If the file doesn't exist, create it and write the data
        await RNFS.writeFile(filePath, JSON.stringify([dataJSON]), 'utf8');
      }

      console.log('JSON file created or edited successfully.');
    } catch (error) {
      console.error('Error creating or editing JSON file:', error);
    }
  };

  return (
    <View style={{flex: 1}}>
      <AppHeader isTab={true} />
      <Image
        source={{uri: imageUri}}
        style={{width: '98%', height: 200, padding: 5}}
      />
      <TextInput
        style={styles.input}
        placeholder="Type your thoughts"
        value={text}
        onChangeText={setText}
      />
      {text && (
        <TouchableOpacity
          onPress={SaveImage}
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            position: 'absolute',
            alignSelf: 'center',
            bottom: 80,
          }}>
          <Icon name={'save-3-line'} size={60} color={'lightblue'} />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default ImageEditScreen;
const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    // borderWidth: 1,
    padding: 10,
  },
});
