import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Button, useTheme } from 'react-native-paper';
import { useTranslation } from 'react-i18next';

import { useDeviceTasks } from 'services/device/queries';
import { useDeviceWater } from 'services/device/mutations';

export const GrowBoxWaterPlant = () => {
  const { t } = useTranslation();
  const {
    colors: { tertiary },
  } = useTheme();
  const { data: tasks, isLoading } = useDeviceTasks();
  const waterPlant = useDeviceWater();

  const handleWaterPlantPress = () => {
    waterPlant.mutate();
  };

  return (
    <>
      <View style={styles.container}>
        <Button
          icon="water"
          style={[styles.button, { backgroundColor: tertiary }]}
          mode="contained"
          onPress={() => handleWaterPlantPress()}
          loading={waterPlant.isLoading || isLoading}
          disabled={waterPlant.isLoading || isLoading}
        >
          {t('water_plant')}
        </Button>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignItems: 'center',
    marginBottom: 20,
  },
  button: {
    width: '100%',
  },
  snackbar: {
    width: '95%',
    alignSelf: 'center',
  },
});
