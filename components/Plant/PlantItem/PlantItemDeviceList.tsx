import { StyleSheet, FlatList } from 'react-native';
import { Chip, Avatar } from 'react-native-paper';

import { useDevices } from 'services/device/queries';
import { BackendPlant } from 'schemas/plants';
import { getImageUrl } from 'services/getImageUrl';

interface PlantItemDeviceListProps {
  plant: BackendPlant;
}

export const PlantItemDeviceList = ({ plant }: PlantItemDeviceListProps) => {
  const { data: devices, isLoading, isError } = useDevices();

  if (isLoading || isError || !devices || devices?.length === 0) return null;

  return (
    <FlatList
      data={devices.filter((device) => device.id === plant.device_id)}
      style={styles.container}
      showsHorizontalScrollIndicator={false}
      renderItem={({ item }) => (
        <Chip
          mode="outlined"
          compact={true}
          avatar={
            <Avatar.Image size={24} source={getImageUrl(item.image_url)} />
          }
        >
          {item.name}
        </Chip>
      )}
      keyExtractor={({ id }) => id.toString()}
      horizontal={true}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignSelf: 'flex-start',
    marginTop: 8,
  },
});
