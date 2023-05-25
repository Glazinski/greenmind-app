import { View, StyleSheet, useWindowDimensions } from 'react-native';
import { TouchableRipple } from 'react-native-paper';

interface CircleCameraButtonProps {
  onPress: () => void;
  isLoading: boolean;
}

const CAMERA_BUTTON_SIZES = {
  width: 70,
  height: 70,
};

export const CircleCameraButton = ({
  onPress,
  isLoading,
}: CircleCameraButtonProps) => {
  const { width } = useWindowDimensions();

  return (
    <View style={styles.buttonContainer}>
      <TouchableRipple
        style={[
          styles.button,
          {
            left: width / 2 - CAMERA_BUTTON_SIZES.width / 2,
          },
        ]}
        onPress={onPress}
        disabled={isLoading}
        borderless={true}
      >
        <></>
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
  buttonContainer: {
    top: 0,
    marginBottom: 80 - CAMERA_BUTTON_SIZES.height / 2,
  },
  button: {
    width: CAMERA_BUTTON_SIZES.width,
    height: CAMERA_BUTTON_SIZES.height,
    bottom: 0,
    borderRadius: 50,
    backgroundColor: '#d6d6d6',

    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.23,
    shadowRadius: 11.27,
    elevation: 14,
  },
});
