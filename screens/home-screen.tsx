import React from 'react';
import { StyleSheet, ScrollView, RefreshControl } from 'react-native';
import { useTheme, Text, Button } from 'react-native-paper';
import { useTranslation } from 'react-i18next';

import { GrowBox } from 'components/grow-box/grow-box';
import { Layout } from 'components/layout';
import { useDeviceLogs, useDevices } from 'services/device/queries';
import { FullPageLoadingSpinner } from 'components/ui/full-page-loading-spinner';
import { HomeDrawerScreenProps } from 'navigation/types';
import { useActiveDeviceStore } from 'store/use-active-device-store';

export const HomeScreen = ({
  navigation,
}: HomeDrawerScreenProps<'Home'>): React.JSX.Element => {
  const { t } = useTranslation();
  const { deviceId } = useActiveDeviceStore();
  const [refreshing, setRefreshing] = React.useState(false);
  const {
    colors: { background },
  } = useTheme();
  const { data: devices, isLoading, isError } = useDevices();
  const { refetch } = useDeviceLogs();

  const handleDeviceLogsRefresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  };

  if (isLoading) return <FullPageLoadingSpinner />;

  if (isError) {
    return (
      <Layout>
        <Text>{t('something_went_wrong')} with fetching devices data</Text>
      </Layout>
    );
  }

  let errorMsg = '';

  if (!devices || devices?.length === 0) {
    errorMsg = t('no_devices_found_details');
  }

  if (!deviceId) {
    errorMsg = t('no_active_device');
  }

  if (errorMsg.length) {
    return (
      <Layout style={[styles.container, { backgroundColor: background }]}>
        <Text variant="titleMedium">{errorMsg}</Text>
        <Button
          onPress={() => {
            navigation.navigate('Devices');
          }}
          style={styles.configureButton}
        >
          {t('configure_device')}
        </Button>
      </Layout>
    );
  }

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={[styles.container, { backgroundColor: background }]}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={handleDeviceLogsRefresh}
        />
      }
    >
      {deviceId && devices.length > 0 && <GrowBox />}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  configureButton: {
    marginTop: 12,
  },
});
