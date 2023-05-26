import React from 'react';
import { StyleSheet, ScrollView } from 'react-native';
import { useTheme, ActivityIndicator, Text, Button } from 'react-native-paper';

import { GrowBox } from 'components/GrowBox/GrowBox';
import { useDevices } from 'services/device/queries';
import { Layout } from 'components/Layout';
import { HomeDrawerScreenProps } from 'navigation/types';

export const HomeScreen = ({
  navigation,
}: HomeDrawerScreenProps<'Home'>): JSX.Element => {
  const {
    colors: { background },
  } = useTheme();
  const { data: devices, isLoading } = useDevices();

  if (isLoading) return <ActivityIndicator size="large" />;

  if (!devices || devices?.length === 0) {
    return (
      <Layout style={[styles.container, { backgroundColor: background }]}>
        <Text variant="titleMedium">
          No device assigned. You need to add and configure new device or assign
          existing one to your account.{' '}
        </Text>
        <Button
          onPress={() => {
            navigation.navigate('Devices');
          }}
          style={styles.configureButton}
        >
          Configure device
        </Button>
      </Layout>
    );
  }

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={[styles.container, { backgroundColor: background }]}
    >
      <GrowBox />
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
