import React from 'react';
import { Image, ImageURISource, StyleSheet } from 'react-native';
import { Surface, IconButton } from 'react-native-paper';
import * as ImagePicker from 'expo-image-picker';

import { Camera } from 'components/camera';
import { FullPageLoadingSpinner } from 'components/ui/full-page-loading-spinner';

interface ImageSelectorProps {
  value: string;
  onChange: (image: string) => void;
  defaultImage: ImageURISource;
}

export const ImageSelector = ({
  value,
  onChange,
  defaultImage,
}: ImageSelectorProps) => {
  const [selectedImage, setSelectedImage] = React.useState<string | undefined>(
    value || defaultImage?.uri || undefined
  );
  const [isCameraOpen, setIsCameraOpen] = React.useState(false);

  React.useEffect(() => {
    if (value) {
      setSelectedImage(value);
    } else if (defaultImage) {
      setSelectedImage(defaultImage.uri ?? '');
    }
  }, [value, defaultImage]);

  React.useEffect(() => {
    if (selectedImage) {
      onChange?.(selectedImage);
    }
  }, [selectedImage]);

  const handleChange = (image: string) => {
    // onChange?.(image);
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

  function renderContent() {
    if (!selectedImage) {
      return <FullPageLoadingSpinner />;
    }

    return (
      <>
        <Image
          style={styles.image}
          source={{
            uri: selectedImage,
          }}
        />
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
      </>
    );
  }

  return (
    <Surface style={styles.container} mode="flat">
      {renderContent()}
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
