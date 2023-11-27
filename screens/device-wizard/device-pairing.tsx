import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Button, useTheme } from 'react-native-paper';

import { queryClient } from 'components/providers';
import { DeviceWizardStackScreenProps } from 'navigation/types';
import { Layout } from 'components/layout';
import { useUserPairingCode } from 'services/user/queries';
import { FullPageLoadingSpinner } from 'components/ui/full-page-loading-spinner';

export const DevicePairing = ({
  navigation,
}: DeviceWizardStackScreenProps<'DevicePairing'>) => {
  const {
    colors: { background },
  } = useTheme();
  const { data: pairingCode, isLoading, isError } = useUserPairingCode();

  function onCancelClick(): void {
    navigation.goBack();
  }

  async function onDoneClick(): Promise<void> {
    await queryClient.invalidateQueries(['devices']);
    navigation.navigate('Index', {
      screen: 'Devices',
    });
  }

  return (
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
            >
              Done
            </Button>
          </View>
        </View>
      )}
    </Layout>
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
