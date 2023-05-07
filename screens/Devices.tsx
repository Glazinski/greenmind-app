import { View, StyleSheet } from 'react-native';
import {
  ActivityIndicator,
  Text,
  useTheme,
  RadioButton,
  Button,
} from 'react-native-paper';

import { useDevices } from 'services/device/queries';
import { useDeviceStore } from 'store/useDeviceStore';

export const Devices = () => {
  const { deviceId, setActiveDevice } = useDeviceStore();
  const { data, isLoading, isError } = useDevices();
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

    if (!data?.length) {
      return <Text>No devices</Text>;
    }

    return (
      <RadioButton.Group
        value={deviceId || '-1'}
        onValueChange={(value) => setActiveDevice(value)}
      >
        {data.map(({ id, name }) => (
          <RadioButton.Item key={id} label={name} value={id.toString()} />
        ))}
      </RadioButton.Group>
    );
  };

  return (
    <View style={[styles.container, { backgroundColor: background }]}>
      <View style={styles.addDeviceContainer}>
        <Button
          style={{ width: '50%' }}
          icon="plus"
          mode="outlined"
          onPress={() => {}}
        >
          <Text style={{ color: primary }}>Dodaj</Text>
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
