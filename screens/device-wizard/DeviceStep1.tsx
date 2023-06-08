import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Button, useTheme } from 'react-native-paper';

import { DeviceWizardStackScreenProps } from 'navigation/types';
import { Layout } from 'components/Layout';

export const DeviceStep1 = ({
  navigation,
  route,
}: DeviceWizardStackScreenProps<'DeviceStep1'>) => {
  const {
    colors: { background },
  } = useTheme();

  return (
    <Layout>
      <View style={[styles.container, { backgroundColor: background }]}>
        <View>
          <Text style={styles.informationBlock} variant="headlineMedium">
            Device configuration
          </Text>
          <Text style={styles.informationBlock} variant="bodyMedium">
            We're here to guide you through the process of adding your new
            device. This process is straightforward and should only take a few
            minutes
          </Text>
          <Text style={styles.informationListItem}>
            1. Find QR code on your device
          </Text>
          <Text style={styles.informationListItem}>
            2. Click below button. On the next screen, you'll be asked to scan
            this QR code using your phone's camera.
          </Text>
          <Text style={styles.informationListItem}>
            3. After successful scan on the next screen you can change name and
            image of your device
          </Text>
        </View>
        <Button
          onPress={() =>
            navigation.navigate('DeviceStep2', {
              ...route.params,
            })
          }
          style={styles.scanButton}
          mode="contained"
        >
          Scan QR
        </Button>
      </View>
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
  },
  informationBlock: {
    marginVertical: 8,
  },
  informationListItem: {
    marginVertical: 2,
  },
  scanButton: {
    marginTop: 32,
  },
});
