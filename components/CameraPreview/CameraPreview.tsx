import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Camera, CameraType } from 'expo-camera';
import { FlipType, manipulateAsync, SaveFormat } from 'expo-image-manipulator';

import { useCameraStore } from 'store/useCameraStore';

import { CircleCameraButton } from './CircleCameraButton';
import { CameraReverseButton } from './CameraReverseButton';

export const CameraPreview = () => {
  const { setIsCameraOpen, setCapturedImage } = useCameraStore();
  const cameraRef = React.useRef<Camera | null>(null);
  const [type, setType] = React.useState(CameraType.back);
  const [isTakingPicture, setIsTakingPicture] = React.useState(false);

  const toggleCameraType = () => {
    setType((current) =>
      current === CameraType.back ? CameraType.front : CameraType.back
    );
  };

  const takePicture = async () => {
    if (!cameraRef.current) return;

    setIsTakingPicture(true);
    let photo = await cameraRef.current.takePictureAsync();

    if (type === CameraType.front) {
      photo = await manipulateAsync(
        photo.uri,
        [{ rotate: 180 }, { flip: FlipType.Vertical }],
        { compress: 1, format: SaveFormat.PNG }
      );
    }

    setIsCameraOpen(false);
    setCapturedImage(photo.uri);
    setIsTakingPicture(false);
  };

  return (
    <Camera
      style={StyleSheet.absoluteFillObject}
      type={type}
      ref={(r) => {
        cameraRef.current = r;
      }}
    >
      <View style={styles.container}>
        <CircleCameraButton onPress={takePicture} isLoading={isTakingPicture} />
        <CameraReverseButton onPress={toggleCameraType} />
        <View style={styles.buttonOverlay} />
      </View>
    </Camera>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: '100%',
    justifyContent: 'flex-end',
    zIndex: -1,
  },
  buttonOverlay: {
    position: 'absolute',
    left: 0,
    bottom: 0,
    width: '100%',
    height: 160,
    backgroundColor: 'black',
    zIndex: -1,
  },
});
