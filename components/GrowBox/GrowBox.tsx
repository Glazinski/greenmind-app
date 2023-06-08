import * as React from 'react';
import { Text } from 'react-native-paper';
import { StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';

import { useAssignedDevice, useDeviceLogs } from 'services/device/queries';
import { usePlant } from 'services/plants/queries';
import { useActivePlantStore } from 'store/useActivePlantStore';

import { GrowBoxAssignedPlant } from './GrowBoxAssignedPlant';
import { GrowBoxImageSelector } from './GrowBoxImageSelector';
import { GrowBoxDataTable } from './GrowBoxDataTable';
import { GrowBoxWaterPlant } from './GrowBoxWaterPlant';
import { FullPageLoadingSpinner } from '../FullPageLoadingSpinner';
import { Layout } from '../Layout';

export const GrowBox = (): JSX.Element => {
  const { t } = useTranslation();
  const activePlantId = useActivePlantStore((state) => state.plantId);
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
  const { data: activePlant } = usePlant(activePlantId);
  const deviceLog = deviceLogs?.[deviceLogs.length - 1];
  const isLoading = isDeviceLoading || isDeviceLogsLoading;
  const isError = isDeviceError || isDeviceLogsError;

  if (isLoading) return <FullPageLoadingSpinner />;

  if (isError) {
    return (
      <Layout>
        <Text>{t('something_went_wrong')}</Text>
      </Layout>
    );
  }

  if (!device || !deviceLog) {
    return (
      <Layout>
        <Text>{t('no_device_data')}</Text>
      </Layout>
    );
  }

  return (
    <>
      <Text variant="titleLarge" style={styles.dataTitle}>
        {device.name}
      </Text>
      <GrowBoxImageSelector device={device} />
      <GrowBoxAssignedPlant />
      {deviceLog && (
        <GrowBoxDataTable deviceLog={deviceLog} activePlant={activePlant} />
      )}
      <GrowBoxWaterPlant />
    </>
  );
};

const styles = StyleSheet.create({
  dataTitle: {
    marginBottom: 10,
  },
});
