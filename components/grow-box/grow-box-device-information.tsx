import { StyleSheet } from 'react-native';
import { ActivityIndicator, Text } from 'react-native-paper';
import { useTranslation } from 'react-i18next';

import { useAssignedDevice } from 'services/device/queries';

import { GrowBoxImageSelector } from './grow-box-image-selector';

export const GrowBoxDeviceInformation = () => {
  const { t } = useTranslation();
  const { data: device, isLoading, isError } = useAssignedDevice();

  if (isLoading) {
    return <ActivityIndicator testID="loading-spinner" />;
  }

  if (isError) {
    return <Text>{t('something_went_wrong')} with fetching device data</Text>;
  }

  if (!device) {
    return <Text>{t('no_device_data')}</Text>;
  }

  return (
    <>
      <Text variant="titleLarge" style={styles.dataTitle}>
        {device.name}
      </Text>
      <GrowBoxImageSelector device={device} />
    </>
  );
};

const styles = StyleSheet.create({
  dataTitle: {
    marginBottom: 10,
  },
});
