import { StyleSheet, View } from 'react-native';
import {
  ActivityIndicator,
  RadioButton,
  Text,
  useTheme,
  TouchableRipple,
} from 'react-native-paper';

import { useDevices } from 'services/device/queries';
import { useActiveDeviceStore } from 'store/useActiveDeviceStore';

export const DeviceList = () => {
  const { deviceId, setDeviceId, setDeviceName } = useActiveDeviceStore();
  const {
    colors: { background },
  } = useTheme();
  const { data: devices, isLoading, isError } = useDevices();

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
        // <View>
        //   <TouchableRipple><></></TouchableRipple>
        // </View>
      ))}
    </RadioButton.Group>
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
