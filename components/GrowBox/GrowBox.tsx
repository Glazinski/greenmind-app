import * as React from 'react';
import { ActivityIndicator, Text } from 'react-native-paper';
import { StyleSheet, View } from 'react-native';

import { useDeviceLogs } from 'services/device/queries';
import { useActiveDeviceStore } from 'store/useActiveDeviceStore';

import { GrowBoxImage } from './GrowBoxImage';
import { GrowBoxDataRow } from './GrowBoxDataRow';
import { GrowBoxDataCell } from './GrowBoxDataCell';
import { GrowBoxWaterPlant } from './GrowBoxWaterPlant';

export const GrowBox = () => {
  const { deviceName } = useActiveDeviceStore();
  const { data: deviceLogs, isLoading, isError } = useDeviceLogs();
  const deviceLog = deviceLogs && deviceLogs[deviceLogs.length - 1];

  if (isError) return <Text>Something went wrong...</Text>;

  if (isLoading) return <ActivityIndicator />;

  return (
    <>
      <Text variant="titleLarge" style={styles.dataTitle}>
        {deviceName}
      </Text>
      <GrowBoxImage />
      {deviceLog && (
        <View style={styles.dataContainer}>
          <GrowBoxDataRow>
            <GrowBoxDataCell label="Temperature" value={deviceLog.temp} />
            <GrowBoxDataCell label="Soil humidity" value={deviceLog.soil_hum} />
          </GrowBoxDataRow>
          <GrowBoxDataRow>
            <GrowBoxDataCell label="Air humidity" value={deviceLog.air_hum} />
            <GrowBoxDataCell label="Light" value={deviceLog.light} />
          </GrowBoxDataRow>
        </View>
      )}
      <GrowBoxWaterPlant />
    </>
  );
};

const styles = StyleSheet.create({
  dataTitle: {
    marginBottom: 10,
  },
  dataContainer: {
    marginTop: 20,
  },
});
