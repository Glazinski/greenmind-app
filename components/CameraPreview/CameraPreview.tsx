import React from 'react';
import {
  StyleSheet,
  View,
  BackHandler,
  useWindowDimensions,
} from 'react-native';
import { Camera, CameraType } from 'expo-camera';
import { FlipType, manipulateAsync, SaveFormat } from 'expo-image-manipulator';
import BottomSheet from '@gorhom/bottom-sheet';
import { useTheme } from 'react-native-paper';

import { useCameraStore } from 'store/useCameraStore';

import { CircleCameraButton } from './CircleCameraButton';
import { CameraReverseButton } from './CameraReverseButton';

export const CameraPreview = () => {
  const {
    colors: { background },
  } = useTheme();
  const { height } = useWindowDimensions();
  const { setIsCameraOpen, setCapturedImage } = useCameraStore();
  const cameraRef = React.useRef<Camera | null>(null);
  const [type, setType] = React.useState(CameraType.back);
  const [isTakingPicture, setIsTakingPicture] = React.useState(false);
  const [isBottomSheetOpen, setIsBottomSheetOpen] = React.useState(false);
  const bottomSheetRef = React.useRef<BottomSheet>(null);

  const snapPoints = React.useMemo(() => [height], [height]);

  React.useEffect(() => {
    const backAction = () => {
      if (isBottomSheetOpen) {
        bottomSheetRef.current?.close();
        setIsBottomSheetOpen(false);
        return true;
      }

      return false;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction
    );

    return () => backHandler.remove();
  }, [isBottomSheetOpen]);

  const handleSheetChanges = React.useCallback(
    (index: number) => {
      setIsBottomSheetOpen(index === 0);
    },
    [setIsBottomSheetOpen]
  );

  const handleSheetClose = React.useCallback(() => {
    setIsBottomSheetOpen(false);
    setIsCameraOpen(false);
  }, [setIsBottomSheetOpen, setIsCameraOpen]);

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
    setIsBottomSheetOpen(false);
  };

  return (
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
