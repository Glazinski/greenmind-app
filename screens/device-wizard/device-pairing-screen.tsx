import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Button, useTheme, Portal, Snackbar } from 'react-native-paper';

import { DeviceWizardStackScreenProps } from 'navigation/types';
import { Layout } from 'components/layout';
import { useUserPairingCode } from 'services/user/queries';
import { FullPageLoadingSpinner } from 'components/ui/full-page-loading-spinner';
import { useAuthStore } from 'store/use-auth-store';
import { useDevices } from '../../services/device/queries';
import { useQueryClient } from '@tanstack/react-query';
import { BackendDevice } from '../../schemas/devices';

export const DevicePairingScreen = ({
  navigation,
}: DeviceWizardStackScreenProps<'DevicePairing'>) => {
  const {
    colors: { background },
  } = useTheme();
  const { data: pairingCode, isLoading, isError } = useUserPairingCode();
  const {
    data: devices,
    isLoading: isDevicesLoading,
    isRefetching: isDevicesRefetching,
    refetch,
  } = useDevices(onDevicesSuccess);
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

  async function onDevicesSuccess(newDevices: BackendDevice[]) {
    console.log('devices', devices);
    console.log('newDevices', newDevices);
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
        type: 'edit',
        deviceId: newId,
      });
      await queryClient.invalidateQueries(['users', userId, 'code']);
    }

    setNewDeviceId(newId);
  }

  function onCancelClick(): void {
    navigation.goBack();
  }

  async function onDoneClick(): Promise<void> {
    await refetch();

    if (typeof newDeviceId !== 'number') {
      setIsSnackbarVisible(true);
    }
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
                {isError ? 'Could not generate code' : pairingCode}
              </Text>
              <Text style={styles.informationBlock} variant="bodyLarge">
                Use this code on website to pair your device with app. When you
                finish setup, click Done button below.
              </Text>
            </View>
            <View style={styles.buttonsContainer}>
              <Button
                style={styles.button}
                onPress={onCancelClick}
                mode="outlined"
              >
                Cancel
              </Button>
              <Button
                style={styles.button}
                onPress={onDoneClick}
                mode="contained"
                loading={isDevicesLoading || isDevicesRefetching}
              >
                Done
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
          // style={styles.snackbar}
        >
          Could not add new device
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
    width: 100,
  },
});
