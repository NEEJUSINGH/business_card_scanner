import React, { useState } from 'react';
import { View, Text, Button, Image } from 'react-native';
import { RNCamera } from 'react-native-camera';
import { DocumentDirectoryPath, moveFile, exists } from 'react-native-fs';

const BusinessCardScanner = () => {
  const [capturedImage, setCapturedImage] = useState(null);

  const capture = async (camera) => {
    if (camera) {
      const options = { quality: 0.5, base64: true };
      const data = await camera.takePictureAsync(options);
      saveImage(data.uri);
      setCapturedImage(data.uri);
    }
  };

  const clearCapture = () => {
    setCapturedImage(null);
  };

  const saveImage = async (imageUri) => {
    const newPath = `${DocumentDirectoryPath}/capturedImage.jpg`;

    try {
      await moveFile(imageUri, newPath);
      console.log('Image saved successfully!');
    } catch (error) {
      console.error('Error saving image:', error);
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Business Card Scanner</Text>
      {capturedImage ? (
        <View>
          <Image
            source={{ uri: capturedImage }}
            style={{ width: 200, height: 200, marginVertical: 20 }}
          />
          <Button title="Clear" onPress={clearCapture} />
        </View>
      ) : (
        <View>
          <RNCamera
            style={{ width: 300, height: 300 }}
            captureAudio={false}
            type={RNCamera.Constants.Type.back}
          />
          <Button title="Capture" onPress={capture} />
        </View>
      )}
    </View>
  );
};

export default BusinessCardScanner;
