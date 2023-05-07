import { View, StyleSheet } from 'react-native';
import {
  ActivityIndicator,
  Text,
  useTheme,
  RadioButton,
  Button,
} from 'react-native-paper';

import { useDevices } from 'services/device/queries';
import { useActiveDeviceStore } from 'store/useActiveDeviceStore';

export const Devices = () => {
  const { deviceId, setDeviceId, setDeviceName } = useActiveDeviceStore();
  const { data: devices, isLoading, isError } = useDevices();
  const {
    colors: { background, primary },
  } = useTheme();

  const renderContent = () => {
    if (isLoading) {
      return (
        <View style={[styles.container, { backgroundColor: background }]}>
          <ActivityIndicator size="large" />
        </View>
      );
    }

    if (isError) {
      return <Text>Error...</Text>;
    }

    if (!devices?.length) {
      return <Text>No devices</Text>;
    }

    return (
      <RadioButton.Group
        value={deviceId || '-1'}
        onValueChange={(value) => {
          const deviceToBeSet = devices.find(({ id }) => id === value);
          setDeviceId(deviceToBeSet!.id);
          setDeviceName(deviceToBeSet!.name);
        }}
      >
        {devices.map(({ id, name }) => (
          <RadioButton.Item key={id} label={name} value={id} />
        ))}
      </RadioButton.Group>
    );
  };

  return (
    <View style={[styles.container, { backgroundColor: background }]}>
      <View style={styles.addDeviceContainer}>
        <Button style={{ width: '50%' }} icon="plus" mode="outlined">
          <Text style={{ color: primary }}>Add</Text>
        </Button>
      </View>
      {renderContent()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  addDeviceContainer: {
    alignItems: 'center',
  },
});
