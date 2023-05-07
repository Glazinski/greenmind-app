import { View } from 'react-native';
import { Button, Snackbar, useTheme } from 'react-native-paper';
import * as React from 'react';
import { useDeviceTasks } from '../../services/device/queries';
import { useDeviceWater } from '../../services/device/mutations';

export const GrowBoxWaterPlant = () => {
  const [isSnackbarVisible, setIsSnackbarVisible] = React.useState(false);
  const {
    colors: { tertiary },
  } = useTheme();
  const { data: tasks } = useDeviceTasks();
  const waterPlant = useDeviceWater();

  const onDismissSnackBar = () => setIsSnackbarVisible(false);

  const handleWaterPlantPress = () => {
    if (!tasks) {
      waterPlant.mutate();
      return;
    }

    const hasTaskInQueue = tasks.some(
      ({ task_number, status }) =>
        task_number === 0 && (status === 0 || status === 1)
    );

    if (hasTaskInQueue) {
      setIsSnackbarVisible(true);
    }
  };

  return (
    <>
      <View style={{ width: '100%', alignItems: 'center', marginTop: 20 }}>
        <Button
          icon="water"
          style={{ backgroundColor: tertiary, width: '40%' }}
          mode="contained"
          onPress={() => handleWaterPlantPress()}
          loading={waterPlant.isLoading}
          disabled={waterPlant.isLoading}
        >
          Water plant
        </Button>
      </View>
      <Snackbar
        visible={isSnackbarVisible}
        onDismiss={onDismissSnackBar}
        action={{
          label: 'Ok',
        }}
        style={{ width: '100%' }}
      >
        Plant watering is either underway or in the queue
      </Snackbar>
    </>
  );
};
