import React from 'react';
import { StyleSheet, View, useWindowDimensions } from 'react-native';
import { Camera, CameraType } from 'expo-camera';
import { FlipType, manipulateAsync, SaveFormat } from 'expo-image-manipulator';
import BottomSheet from '@gorhom/bottom-sheet';
import { useTheme, Portal } from 'react-native-paper';

import { CircleCameraButton } from './circle-camera-button';
import { CameraReverseButton } from './camera-reverse-button';
import { useBackPress } from '../../hooks/use-back-press';

interface CameraPreviewProps {
  onDismiss: () => void;
  onChange: (image: string) => void;
}

export const CameraView = ({ onDismiss, onChange }: CameraPreviewProps) => {
  const {
    colors: { background },
  } = useTheme();
  const { height } = useWindowDimensions();
  const cameraRef = React.useRef<Camera | null>(null);
  const [type, setType] = React.useState(CameraType.back);
  const [isTakingPicture, setIsTakingPicture] = React.useState(false);
  const [isBottomSheetOpen, setIsBottomSheetOpen] = React.useState(false);
  const bottomSheetRef = React.useRef<BottomSheet>(null);
  const snapPoints = React.useMemo(() => [height], [height]);

  const backAction = React.useCallback(() => {
    if (isBottomSheetOpen) {
      bottomSheetRef.current?.close();
      setIsBottomSheetOpen(false);
      return true;
    }

    return false;
  }, [isBottomSheetOpen]);

  useBackPress(backAction);

  const handleSheetChanges = React.useCallback(
    (index: number) => {
      setIsBottomSheetOpen(index === 0);
    },
    [setIsBottomSheetOpen]
  );

  const handleSheetClose = React.useCallback(() => {
    setIsBottomSheetOpen(false);
    onDismiss();
    // setIsCameraOpen(false);
  }, [setIsBottomSheetOpen, onDismiss]);

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

    // setIsCameraOpen(false);
    onDismiss();
    onChange(photo.uri);
    // setCapturedImage(photo.uri);
    setIsTakingPicture(false);
    setIsBottomSheetOpen(false);
  };

  return (
    <Portal>
      <BottomSheet
        ref={bottomSheetRef}
        snapPoints={snapPoints}
        onChange={handleSheetChanges}
        onClose={handleSheetClose}
        enablePanDownToClose
        backgroundStyle={{
          backgroundColor: background,
        }}
      >
        {isBottomSheetOpen && (
          <Camera
            style={StyleSheet.absoluteFillObject}
            type={type}
            ref={(r) => {
              cameraRef.current = r;
            }}
          >
            <View style={styles.container}>
              <CircleCameraButton
                onPress={takePicture}
                isLoading={isTakingPicture}
              />
              <CameraReverseButton onPress={toggleCameraType} />
              <View style={styles.buttonOverlay} />
            </View>
          </Camera>
        )}
      </BottomSheet>
    </Portal>
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
