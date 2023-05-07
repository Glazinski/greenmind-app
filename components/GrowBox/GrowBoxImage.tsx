import React from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { Text, Surface, IconButton, Button } from 'react-native-paper';
import * as ImagePicker from 'expo-image-picker';

import { useCameraStore } from 'store/useCameraStore';

export const GrowBoxImage = () => {
  const { capturedImage, setIsCameraOpen } = useCameraStore();
  const [selectedImage, setSelectedImage] = React.useState<string | null>(null);

  React.useEffect(() => {
    if (capturedImage) {
      setSelectedImage(capturedImage);
    }
  }, [capturedImage, setSelectedImage]);

  const pickImageAsync = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
    }
  };

  const getSourceImage = React.useCallback(() => {
    if (selectedImage) return { uri: selectedImage };

    return require('../../assets/icon.png');
  }, [selectedImage]);

  return (
    <Surface style={styles.container} mode="flat">
      <Image style={styles.image} source={getSourceImage()} />
      <IconButton
        style={styles.editButton}
        icon="pencil"
        mode="contained"
        onPress={() => pickImageAsync()}
      />
      <IconButton
        style={styles.cameraButton}
        icon="camera"
        mode="contained"
        onPress={() => setIsCameraOpen(true)}
      />
    </Surface>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    height: 350,
    borderRadius: 15,
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 15,
  },
  editButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
  },
  cameraButton: {
    position: 'absolute',
    bottom: 0,
    right: 60,
  },
});
