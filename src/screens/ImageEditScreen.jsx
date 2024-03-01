import React, { useEffect, useState, useRef } from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import { Camera, useCameraDevices } from 'react-native-vision-camera'

const ImageEditScreen = () => {
    const [imagePath, setImagePath] = useState()
    const [showCamera, setShowCamera] = useState(false);
    const camera = useRef(null);
    const devices = useCameraDevices();
    const device = devices.back;

    console.log(devices.back)
    const clickImages = async () => {
        if (camera.current !== null) {
            const photo = await camera.current.takePhoto({});
            setImagePath(photo.path);
            setShowCamera(false);
            console.log(photo.path);
        }
    }
    return (
        <View>
            <Text>ImageEditScreen</Text>
            <Camera
                ref={camera}
                // style={StyleSheet.absoluteFill}
                device={device}
                isActive={true}
                photo={true}
            />
            <TouchableOpacity onPress={() => clickImages()}><Text>click</Text></TouchableOpacity>
        </View>
    )
}

export default ImageEditScreen