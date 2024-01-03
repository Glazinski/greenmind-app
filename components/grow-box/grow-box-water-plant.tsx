import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Button, useTheme } from 'react-native-paper';
import { useTranslation } from 'react-i18next';
import { useQueryClient } from '@tanstack/react-query';

import { useDeviceTasks } from 'services/device/queries';
import { useDeviceWater } from 'services/device/mutations';
import { useActiveDeviceStore } from 'store/use-active-device-store';

export const GrowBoxWaterPlant = () => {
  const { deviceId } = useActiveDeviceStore();
  const queryClient = useQueryClient();
  const { t } = useTranslation();
  const {
    colors: { tertiary },
  } = useTheme();
  const { data: tasks, isLoading: isDeviceTasksLoading } = useDeviceTasks();
  const waterPlant = useDeviceWater();

  const handleWaterPlantPress = async () => {
    waterPlant.mutate();
    await queryClient.invalidateQueries(['devices', deviceId]);
  };

  const hasPendingTasks = (tasks?.length ?? -1) > 0;

  return (
    <>
      <View style={styles.container}>
        <Button
          icon="water"
          style={[styles.button, { backgroundColor: tertiary }]}
          mode="contained"
          onPress={() => handleWaterPlantPress()}
          loading={waterPlant.isLoading || isDeviceTasksLoading}
          disabled={
            waterPlant.isLoading || isDeviceTasksLoading || hasPendingTasks
          }
        >
          {hasPendingTasks ? t('watering_in_queue') : t('water_plant')}
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
