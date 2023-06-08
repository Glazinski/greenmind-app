import { Menu } from 'react-native-paper';

import { BackendPlant } from 'schemas/plants';
import { useAssignPlantToDevice } from 'services/plants/mutations';

interface PlantItemAssignActionProps {
  plant: BackendPlant;
  onPress: () => void;
}

export const PlantItemAssignAction = ({
  plant,
  onPress,
}: PlantItemAssignActionProps) => {
  const { mutate: assignPlantToDevice } = useAssignPlantToDevice();

  const handleOnPress = async () => {
    if (plant) {
      await assignPlantToDevice(plant);
    }
    onPress();
  };

  return (
    <Menu.Item
      onPress={handleOnPress}
      title="Assign to device"
      leadingIcon="plus"
    />
  );
};
