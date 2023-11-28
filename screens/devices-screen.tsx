import React from 'react';
import { View, StyleSheet, ScrollView, RefreshControl } from 'react-native';
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

    if (isError) {
      return <Text>{t('something_went_wrong')}</Text>;
    }

    if (!devices?.length) {
      return <Text>{t('no_devices_found')}</Text>;
    }

    return <DeviceList devices={devices} />;
  };

  return (
    <>
      <Layout
        style={styles.container}
        as={ScrollView}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={handleDevicesRefresh}
          />
        }
      >
        {renderContent()}
      </Layout>
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
