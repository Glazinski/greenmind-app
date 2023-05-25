import React from 'react';
import { View, StyleSheet } from 'react-native';
import {
  ActivityIndicator,
  Text,
  useTheme,
  RadioButton,
  FAB,
} from 'react-native-paper';
import type { CompositeScreenProps } from '@react-navigation/native';
import type { DrawerScreenProps } from '@react-navigation/drawer';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

import { useDevices } from 'services/device/queries';
import { useActiveDeviceStore } from 'store/useActiveDeviceStore';
import { RootStackParamList } from 'navigation/RootNavigator';
import { DrawerParamList } from 'navigation/DrawerNavigator';

type DevicesScreenProps = CompositeScreenProps<
  DrawerScreenProps<DrawerParamList, 'Devices'>,
  NativeStackScreenProps<RootStackParamList>
>;

export const Devices = ({ navigation }: DevicesScreenProps) => {
  const { deviceId, setDeviceId, setDeviceName } = useActiveDeviceStore();
  const { data: devices, isLoading, isError } = useDevices();
  const {
    colors: { background },
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
      {renderContent()}
      <FAB
        icon="plus"
        style={styles.fab}
        onPress={() => navigation.navigate('DeviceStep1')}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  fab: {
    position: 'absolute',
    marginRight: 16,
    marginBottom: 40,
    right: 0,
    bottom: 0,
  },
});
