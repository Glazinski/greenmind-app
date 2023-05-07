import React from 'react';
import { Camera } from 'expo-camera';

import { useCameraStore } from 'store/useCameraStore';

import { CameraPreview } from './CameraPreview';

export const CameraPreviewContainer = () => {
  const { isCameraOpen } = useCameraStore();
  const [permission, requestPermission] = Camera.useCameraPermissions();

  const bootstrapPermissions = React.useCallback(async () => {
    if (!permission?.granted) {
      await requestPermission();
    }
  }, [permission?.granted, requestPermission]);

  React.useEffect(() => {
    bootstrapPermissions();
  }, [bootstrapPermissions]);

  return <>{permission?.granted && isCameraOpen && <CameraPreview />}</>;
};
