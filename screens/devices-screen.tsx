import React from 'react';
import { StyleSheet } from 'react-native';
import { ActivityIndicator, Text, FAB } from 'react-native-paper';
import { useTranslation } from 'react-i18next';

import { useDevices } from 'services/device/queries';
import { Layout } from 'components/layout';
import { DeviceList } from 'components/device/device-list';
import { HomeDrawerScreenProps } from 'navigation/types';

export const DevicesScreen = ({
  navigation,
}: HomeDrawerScreenProps<'Devices'>): React.JSX.Element => {
  const [refreshing, setRefreshing] = React.useState(false);
  const { t } = useTranslation();
  const { data: devices, isLoading, isError, refetch } = useDevices();

  const handleDevicesRefresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  };

  const renderContent = () => {
    if (isLoading) {
      return <ActivityIndicator size="large" />;
    }

    let headerComponent: React.ReactElement | null = null;

    if (isError) {
      headerComponent = <Text>{t('something_went_wrong')}</Text>;
    } else if (!devices?.length) {
      headerComponent = <Text>{t('no_devices_found')}</Text>;
    }

    return (
      <DeviceList
        devices={headerComponent ? [] : devices ?? []}
        headerComponent={headerComponent}
      />
    );
  };

  return (
    <>
      <Layout style={styles.container}>{renderContent()}</Layout>
      <FAB
        icon="plus"
        style={styles.fab}
        onPress={() =>
          navigation.navigate('DeviceWizard', {
            screen: 'DevicePairing',
            params: {
              type: 'add',
            },
          })
        }
      />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
  },
  fab: {
    position: 'absolute',
    marginRight: 16,
    marginBottom: 20,
    right: 0,
    bottom: 0,
  },
});
