import { StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useTheme } from 'react-native-paper';

interface GrowBoxPlantIndicatorProps {
  isActive: boolean;
  onPress: () => void;
  style?: object;
}

export const GrowBoxPlantIndicator = ({
  isActive,
  onPress,
  style,
}: GrowBoxPlantIndicatorProps) => {
  const {
    colors: { tertiary },
  } = useTheme();

  return (
    <TouchableOpacity
      style={[
        styles.container,
        style,
        {
          borderColor: isActive ? tertiary : 'white',
        },
      ]}
      onPress={onPress}
    >
      <Image
        style={styles.image}
        source={require('../../../assets/icon.png')}
        resizeMode="cover"
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 60,
    height: 60,
    borderRadius: 50,
    borderWidth: 2,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
  },
});
