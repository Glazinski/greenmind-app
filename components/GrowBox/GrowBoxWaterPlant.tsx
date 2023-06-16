import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Button, Snackbar, Portal, useTheme } from 'react-native-paper';

import { useDeviceTasks } from 'services/device/queries';
import { useDeviceWater } from 'services/device/mutations';

export const GrowBoxWaterPlant = () => {
  const [isSnackbarVisible, setIsSnackbarVisible] = React.useState(false);
  const {
    colors: { tertiary },
  } = useTheme();
  const { data: tasks } = useDeviceTasks();
  const waterPlant = useDeviceWater();

  const onDismissSnackBar = () => setIsSnackbarVisible(false);

  const handleWaterPlantPress = async () => {
    await waterPlant.mutate();
    // if (!tasks) {
    //   return;
    // }
    //
    // const hasTaskInQueue = tasks?.some(
    //   ({ task_number, status }) =>
    //     task_number === 0 && (status === 0 || status === 1)
    // );
    //
    // if (hasTaskInQueue) {
    //   setIsSnackbarVisible(true);
    // }
  };

  return (
    <>
      <View style={styles.container}>
        <Button
          icon="water"
          style={[styles.button, { backgroundColor: tertiary }]}
          mode="contained"
          onPress={() => handleWaterPlantPress()}
          loading={waterPlant.isLoading}
          disabled={waterPlant.isLoading}
        >
          Water plant
        </Button>
      </View>
      <Portal>
        <Snackbar
          visible={isSnackbarVisible}
          onDismiss={onDismissSnackBar}
          action={{
            label: 'Ok',
          }}
          style={styles.snackbar}
        >
          Plant watering is either underway or in the queue
        </Snackbar>
      </Portal>
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
