import { TouchableOpacity, View, StyleSheet } from 'react-native';

interface CircleCameraButtonProps {
  onPress: () => void;
}

export const CircleCameraButton = ({ onPress }: CircleCameraButtonProps) => {
  return (
    <View style={styles.container}>
      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={onPress} style={styles.button} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    flexDirection: 'row',
    flex: 1,
    width: '100%',
    padding: 20,
    justifyContent: 'space-between',
  },
  buttonContainer: {
    flex: 1,
    alignSelf: 'center',
    alignItems: 'center',
  },
  button: {
    width: 70,
    height: 70,
    bottom: 0,
    borderRadius: 50,
    backgroundColor: '#fff',
  },
});
