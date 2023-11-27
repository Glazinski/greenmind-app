import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Button, useTheme } from 'react-native-paper';

import { DeviceWizardStackScreenProps } from 'navigation/types';
import { Layout } from 'components/layout';
import { useUserPairingCode } from 'services/user/queries';
import { FullPageLoadingSpinner } from 'components/ui/full-page-loading-spinner';

export const DeviceStep1 = ({
  navigation,
  route,
}: DeviceWizardStackScreenProps<'DeviceStep1'>) => {
  const {
    colors: { background },
  } = useTheme();
  const { data: pairingCode, isLoading, isError } = useUserPairingCode();

  if (isLoading) {
    return (
      <Layout>
        <FullPageLoadingSpinner />
      </Layout>
    );
  }

  return (
    <Layout>
      <View style={[styles.container, { backgroundColor: background }]}>
        <View>
          <Text style={styles.informationBlock} variant="headlineMedium">
            Device configuration
          </Text>
          <Text style={styles.pairingCode} variant="headlineMedium">
            {isError ? 'Could not generate code' : pairingCode}
          </Text>
          <Text style={styles.informationBlock} variant="bodyMedium">
            Use this code on website to pair your device with app. When you
            finish setup, click button below.
          </Text>
        </View>
        <View style={styles.buttonsContainer}>
          <Button onPress={() => {}} mode="outlined">
            Cancel
          </Button>
          <Button
            onPress={() =>
              navigation.navigate('DeviceStep2', {
                ...route.params,
              })
            }
            mode="contained"
          >
            Done
          </Button>
        </View>
      </View>
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
    justifyContent: 'space-evenly',
    marginTop: 32,
  },
});
