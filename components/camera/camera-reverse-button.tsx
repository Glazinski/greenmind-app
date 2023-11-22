import { StyleSheet, useWindowDimensions, View } from 'react-native';
import { TouchableRipple } from 'react-native-paper';
import Icon from '@expo/vector-icons/MaterialCommunityIcons';

const CAMERA_TYPE_BUTTON_SIZE = {
  width: 50,
  height: 50,
};

interface CameraReverseButtonProps {
  onPress: () => void;
}

export const CameraReverseButton = ({ onPress }: CameraReverseButtonProps) => {
  const { width } = useWindowDimensions();

  return (
    <View
      style={[
        styles.cameraType,
        {
          marginRight: width / 4 - CAMERA_TYPE_BUTTON_SIZE.width,
        },
      ]}
    >
      <TouchableRipple borderless={true} onPress={onPress}>
        <Icon name="camera-flip-outline" size={30} color="#d6d6d6" />
      </TouchableRipple>
    </View>
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
  cameraType: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    marginBottom: 80 - CAMERA_TYPE_BUTTON_SIZE.height / 2,
    borderRadius: 50,
    backgroundColor: '#333333',
    width: CAMERA_TYPE_BUTTON_SIZE.width,
    height: CAMERA_TYPE_BUTTON_SIZE.height,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
