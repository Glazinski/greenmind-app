import React from 'react';
import { StyleSheet, ScrollView } from 'react-native';
import { useTheme, Text, Button } from 'react-native-paper';
import { useTranslation } from 'react-i18next';

import { GrowBox } from 'components/GrowBox/GrowBox';
import { Layout } from 'components/Layout';
import { useDevices } from 'services/device/queries';
import { FullPageLoadingSpinner } from 'components/FullPageLoadingSpinner';
import { HomeDrawerScreenProps } from 'navigation/types';
import { useActiveDeviceStore } from 'store/useActiveDeviceStore';

export const HomeScreen = ({
  navigation,
}: HomeDrawerScreenProps<'Home'>): JSX.Element => {
  const { t } = useTranslation();
  const { deviceId } = useActiveDeviceStore();
  const {
    colors: { background },
  } = useTheme();
  const { data: devices, isLoading } = useDevices();

  if (isLoading) return <FullPageLoadingSpinner />;

  if (!devices || devices?.length === 0) {
    return (
      <Layout style={[styles.container, { backgroundColor: background }]}>
        <Text variant="titleMedium">{t('no_devices_found_details')}</Text>
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

  if (!deviceId) {
    return (
      <Layout style={[styles.container, { backgroundColor: background }]}>
        <Text variant="titleMedium">{t('no_active_device')}</Text>
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
