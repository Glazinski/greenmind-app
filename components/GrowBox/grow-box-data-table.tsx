import React from 'react';
import { View, StyleSheet } from 'react-native';
import { ActivityIndicator, Portal, Snackbar, Text } from 'react-native-paper';
import { useTranslation } from 'react-i18next';

import { usePlantsAssignedToDevice } from 'services/plants/queries';
import { useDeviceLogs } from 'services/device/queries';

import { GrowBoxDataRow } from './grow-box-data-row';
import { GrowBoxDataCell } from './grow-box-data-cell';

export const GrowBoxDataTable = () => {
  const { t } = useTranslation();
  const [visible, setVisible] = React.useState(false);
  const [snackbarText, setSnackbarText] = React.useState('');
  const {
    data: deviceLogs,
    isLoading: isDeviceLogsLoading,
    isError: isDeviceLogsError,
  } = useDeviceLogs();
  const { data: assignedPlants, isLoading: isAssignedPlantLoading } =
    usePlantsAssignedToDevice();
  const isLoading = isDeviceLogsLoading || isAssignedPlantLoading;
  const assignedPlant = assignedPlants?.[0];
  const deviceLog = deviceLogs?.[deviceLogs.length - 1];

  const showSnackbar = () => setVisible(true);

  const hideSnackbar = () => setVisible(false);

  const onSensorProblemPress = () => {
    hideSnackbar();
    setSnackbarText('Sensor might be broken or disconnected');
    showSnackbar();
  };

  const onLevelProblemPress = (label: string, min?: number, max?: number) => {
    if (typeof min !== 'number' && typeof max !== 'number') return;

    hideSnackbar();
    setSnackbarText(`${label} level should be between ${min} and ${max}`);
    showSnackbar();
  };

  if (isLoading) return <ActivityIndicator />;

  if (isDeviceLogsError) {
    return <Text>{t('something_went_wrong')} with fetching device logs</Text>;
  }

  if (!deviceLog) {
    return <Text>{t('no_device_logs')}</Text>;
  }

  const { temp, soil_hum, air_hum, light } = deviceLog;

  return (
    <>
      <View style={styles.dataContainer}>
        <GrowBoxDataRow>
          <GrowBoxDataCell
            label="Temperature °C"
            value={temp}
            onLevelProblemPress={onLevelProblemPress}
            onSensorProblemPress={onSensorProblemPress}
            minValue={assignedPlant?.temp_min}
            maxValue={assignedPlant?.temp_max}
          />
          <GrowBoxDataCell
            label="Soil humidity"
            value={soil_hum}
            onLevelProblemPress={onLevelProblemPress}
            onSensorProblemPress={onSensorProblemPress}
            minValue={assignedPlant?.soil_humidity_min}
            maxValue={assignedPlant?.soil_humidity_max}
          />
        </GrowBoxDataRow>
        <GrowBoxDataRow>
          <GrowBoxDataCell
            label="Air humidity"
            value={air_hum}
            onLevelProblemPress={onLevelProblemPress}
            onSensorProblemPress={onSensorProblemPress}
            minValue={assignedPlant?.air_humidity_min}
            maxValue={assignedPlant?.air_humidity_max}
          />
          <GrowBoxDataCell
            label="Light"
            value={light}
            onSensorProblemPress={onSensorProblemPress}
            onLevelProblemPress={onLevelProblemPress}
            minValue={assignedPlant?.light_min}
            maxValue={assignedPlant?.light_max}
          />
        </GrowBoxDataRow>
      </View>
      <Portal>
        <Snackbar
          visible={visible && snackbarText.length > 0}
          onDismiss={hideSnackbar}
          action={{
            label: `Close`,
            onPress: () => {
              hideSnackbar();
            },
          }}
        >
          {snackbarText}
        </Snackbar>
      </Portal>
    </>
  );
};

const styles = StyleSheet.create({
  dataTitle: {
    marginBottom: 10,
  },
  dataContainer: {
    marginTop: 10,
  },
  dataRow: {
    marginBottom: 10,
  },
});
