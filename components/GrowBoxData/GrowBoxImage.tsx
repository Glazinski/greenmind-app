import React from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { Text, Surface, IconButton } from 'react-native-paper';
import * as ImagePicker from 'expo-image-picker';

export const GrowBoxImage = () => {
  const [selectedImage, setSelectedImage] = React.useState<string | null>(null);
  const pickImageAsync = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
    }
  };

  return (
    <Surface style={styles.container} mode="flat">
      <Image
        style={styles.image}
        source={
          selectedImage !== null
            ? { uri: selectedImage }
            : require('../../assets/icon.png')
        }
      />
      <IconButton
        style={styles.editButton}
        icon="pencil"
        mode="contained"
        onPress={() => pickImageAsync()}
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
});
