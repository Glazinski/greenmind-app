import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Button, useTheme, Portal, Snackbar } from 'react-native-paper';
import { useQueryClient } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';

import { DeviceWizardStackScreenProps } from 'navigation/types';
import { Layout } from 'components/layout';
import { useUserPairingCode } from 'services/user/queries';
import { FullPageLoadingSpinner } from 'components/ui/full-page-loading-spinner';
import { useAuthStore } from 'store/use-auth-store';
import { useDevices } from 'services/device/queries';

export const DevicePairingScreen = ({
  navigation,
}: DeviceWizardStackScreenProps<'DevicePairing'>) => {
  const { t } = useTranslation();
  const {
    colors: { background },
  } = useTheme();
  const { data: pairingCode, isLoading, isError } = useUserPairingCode();
  const {
    data: devices,
    isLoading: isDevicesLoading,
    isRefetching: isDevicesRefetching,
    refetch,
  } = useDevices();
  const userId = useAuthStore((state) => state.userId);
  const queryClient = useQueryClient();
  const [newDeviceId, setNewDeviceId] = React.useState<number | null>(null);
  const [isSnackbarVisible, setIsSnackbarVisible] = React.useState(false);

  React.useEffect(() => {
    return () => {
      setNewDeviceId(null);
    };
  }, []);

  const onDismissSnackBar = () => setIsSnackbarVisible(false);

  function onCancelClick(): void {
    navigation.goBack();
  }

  async function onDoneClick(): Promise<void> {
    const { data: newDevices } = await refetch();
    let newId: number | null = null;

    if (
      typeof newDevices?.length === 'number' &&
      typeof devices?.length === 'number' &&
      devices.length !== newDevices.length
    ) {
      newId = newDevices[newDevices.length - 1].id;
    }

    if (typeof newId === 'number') {
      navigation.navigate('DeviceForm', {
        type: 'add',
        deviceId: newId,
      });
      await queryClient.invalidateQueries(['users', userId, 'code']);
      return;
    }

    setIsSnackbarVisible(true);
  }

  return (
    <>
      <Layout>
        {isLoading ? (
          <FullPageLoadingSpinner />
        ) : (
          <View style={[styles.container, { backgroundColor: background }]}>
            <View>
              <Text style={styles.pairingCode} variant="headlineMedium">
                {isError ? t('could_not_generate_code') : pairingCode}
              </Text>
              <Text style={styles.informationBlock} variant="bodyLarge">
                {t('pairing_info')}
              </Text>
            </View>
            <View style={styles.buttonsContainer}>
              <Button
                style={styles.button}
                onPress={onCancelClick}
                mode="outlined"
              >
                {t('cancel')}
              </Button>
              <Button
                style={styles.button}
                onPress={onDoneClick}
                mode="contained"
                loading={isDevicesLoading || isDevicesRefetching}
              >
                {t('finish')}
              </Button>
            </View>
          </View>
        )}
      </Layout>
      <Portal>
        <Snackbar
          visible={isSnackbarVisible}
          onDismiss={onDismissSnackBar}
          action={{
            label: 'Ok',
          }}
        >
          {t('could_not_add_device')}
        </Snackbar>
      </Portal>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
  },
  pairingCode: {
    alignSelf: 'center',
    marginVertical: 12,
    letterSpacing: 2,
  },
  informationBlock: {
    marginVertical: 8,
  },
  informationListItem: {
    marginVertical: 2,
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 32,
    gap: 16,
  },
  button: {
    width: 150,
  },
});
