import React from 'react';
import { Image, ImageSourcePropType, StyleSheet } from 'react-native';
import { Surface, IconButton } from 'react-native-paper';
import * as ImagePicker from 'expo-image-picker';

import { replaceLocalhostToIP } from 'api';
import { Camera } from 'components/camera';

interface ImageSelectorProps {
  value: string;
  onChange: (image: string) => void;
  defaultImage: ImageSourcePropType;
}

export const ImageSelector = ({
  value,
  onChange,
  defaultImage,
}: ImageSelectorProps) => {
  const [selectedImage, setSelectedImage] = React.useState<string | null>(
    value || null
  );
  const [isCameraOpen, setIsCameraOpen] = React.useState(false);

  React.useEffect(() => {
    if (value) {
      setSelectedImage(value);
    }
  }, [value]);

  const handleChange = (image: string) => {
    onChange?.(image);
    setSelectedImage(image);
  };

  const pickImageAsync = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      handleChange(result.assets[0].uri);
    }
  };

  const getSourceImage = React.useCallback(() => {
    if (selectedImage) return { uri: replaceLocalhostToIP(selectedImage) };

    // return require('../../assets/images/icon.png');
    return defaultImage;
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
      <Camera
        isCameraOpen={isCameraOpen}
        onDismiss={() => setIsCameraOpen(false)}
        onChange={(image) => handleChange(image)}
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
