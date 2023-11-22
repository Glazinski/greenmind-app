import React from 'react';
import { Camera as ExpoCamera } from 'expo-camera';

import { CameraView } from './camera-view';

interface CameraPreviewContainerProps {
  isCameraOpen: boolean;
  onDismiss: () => void;
  onChange: (image: string) => void;
}

export const Camera = ({
  isCameraOpen,
  onDismiss,
  onChange,
}: CameraPreviewContainerProps) => {
  const [permission, requestPermission] = ExpoCamera.useCameraPermissions();

  const bootstrapPermissions = React.useCallback(async () => {
    if (!permission?.granted) {
      await requestPermission();
    }
  }, [permission?.granted, requestPermission]);

  React.useEffect(() => {
    bootstrapPermissions();
  }, [bootstrapPermissions]);

  return (
    <>
      {permission?.granted && isCameraOpen && (
        <CameraView onDismiss={onDismiss} onChange={onChange} />
      )}
    </>
  );
};
