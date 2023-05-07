import React from 'react';
import { StyleSheet } from 'react-native';
import { Camera, CameraType } from 'expo-camera';

import { useCameraStore } from 'store/useCameraStore';

import { CircleCameraButton } from './CircleCameraButton';

export const CameraPreview = () => {
  const { setIsCameraOpen, setCapturedImage } = useCameraStore();
  const cameraRef = React.useRef<Camera | null>(null);
  const [type, setType] = React.useState(CameraType.back);

  // TODO: Implement usage of it
  const toggleCameraType = () => {
    setType((current) =>
      current === CameraType.back ? CameraType.front : CameraType.back
    );
  };

  const takePicture = async () => {
    console.log(cameraRef);
    if (!cameraRef.current) return;

    const photo = await cameraRef.current.takePictureAsync();
    setIsCameraOpen(false);
    setCapturedImage(photo.uri);
  };

  return (
    <Camera
      style={StyleSheet.absoluteFillObject}
      type={type}
      ref={(r) => {
        cameraRef.current = r;
      }}
    >
      <CircleCameraButton onPress={takePicture} />
    </Camera>
  );
};
