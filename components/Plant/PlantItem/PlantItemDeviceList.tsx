import { StyleSheet, FlatList } from 'react-native';
import { Chip } from 'react-native-paper';

import { useDevices } from 'services/device/queries';

export const PlantItemDeviceList = () => {
  const { data: devices, isLoading, isError } = useDevices();

  // TODO: Implement checking if this plant belongs to a device
  return null;

  if (isLoading || isError || !devices || devices?.length === 0) return null;

  return (
    <FlatList
      data={devices}
      style={styles.container}
      showsHorizontalScrollIndicator={false}
      renderItem={({ item }) => (
        <Chip mode="outlined" compact={true}>
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
  },
});
