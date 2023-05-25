import React from 'react';
import { StyleSheet } from 'react-native';
import { ActivityIndicator, Text, FAB } from 'react-native-paper';
import { useTranslation } from 'react-i18next';

import { useDevices } from 'services/device/queries';
import { Layout } from 'components/Layout';
import { DeviceList } from 'components/Device/DeviceList';
import { HomeDrawerScreenProps } from 'navigation/types';

export const DevicesScreen = ({
  navigation,
}: HomeDrawerScreenProps<'Devices'>) => {
  const { t } = useTranslation();
  const { data: devices, isLoading, isError } = useDevices();

  const renderContent = () => {
    if (isLoading) {
      return <ActivityIndicator size="large" />;
    }

    if (isError) {
      return <Text>{t('something_went_wrong')}</Text>;
    }

    if (!devices?.length) {
      return <Text>{t('no_devices_found')}</Text>;
    }

    return <DeviceList devices={devices} />;
  };

  return (
    <Layout style={styles.container}>
      {renderContent()}
      <FAB
        icon="plus"
        style={styles.fab}
        onPress={() =>
          navigation.navigate('DeviceWizard', {
            screen: 'DeviceStep1',
          })
        }
      />
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
  },
  fab: {
    position: 'absolute',
    marginRight: 16,
    marginBottom: 40,
    right: 0,
    bottom: 0,
  },
});
