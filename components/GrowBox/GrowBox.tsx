import * as React from 'react';
import { Text } from 'react-native-paper';
import { StyleSheet, View } from 'react-native';
import { useTranslation } from 'react-i18next';

import { useAssignedDevice, useDeviceLogs } from 'services/device/queries';
import { ImageSelector } from 'components/ImageSelector';

import { GrowBoxPlantSelector } from './GrowBoxPlantSelector';
import { GrowBoxDataRow } from './GrowBoxDataRow';
import { GrowBoxDataCell } from './GrowBoxDataCell';
import { GrowBoxWaterPlant } from './GrowBoxWaterPlant';
import { FullPageLoadingSpinner } from '../FullPageLoadingSpinner';

export const GrowBox = () => {
  const { t } = useTranslation();
  const {
    data: device,
    isLoading: isDeviceLoading,
    isError: isDeviceError,
  } = useAssignedDevice();
  const {
    data: deviceLogs,
    isLoading: isDeviceLogsLoading,
    isError: isDeviceLogsError,
  } = useDeviceLogs();
  const deviceLog = deviceLogs && deviceLogs[deviceLogs.length - 1];
  const isLoading = isDeviceLoading || isDeviceLogsLoading;
  const isError = isDeviceError || isDeviceLogsError;

  if (isLoading) return <FullPageLoadingSpinner />;

  if (isError) return <Text>{t('something_went_wrong')}</Text>;

  if (!device || !deviceLog) return <Text>No device data</Text>;

  return (
    <>
      <Text variant="titleLarge" style={styles.dataTitle}>
        {device.name}
      </Text>
      <ImageSelector />
      {deviceLog && (
        <View style={styles.dataContainer}>
          <GrowBoxPlantSelector style={styles.dataRow} />
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
  dataRow: {
    marginBottom: 10,
  },
});
