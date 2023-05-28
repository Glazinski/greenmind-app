import { StyleSheet } from 'react-native';
import { Surface, Text } from 'react-native-paper';

interface GrowBoxPlantSelectorProps {
  style?: object;
}

export const GrowBoxPlantSelector = ({ style }: GrowBoxPlantSelectorProps) => {
  const assignedPlants = [{}, {}, {}];

  return (
    <Surface style={[styles.container, style]} mode="flat">
      <Text>Plant selector</Text>
    </Surface>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    borderRadius: 12,
  },
});
