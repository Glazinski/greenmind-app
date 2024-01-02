import React from 'react';
import { View, StyleSheet } from 'react-native';
import { ActivityIndicator, Portal, Snackbar, Text } from 'react-native-paper';
import { useTranslation } from 'react-i18next';
import { useNavigation } from '@react-navigation/native';

import { usePlantsAssignedToDevice } from 'services/plants/queries';
import { useDeviceLogs } from 'services/device/queries';
import { HomeDrawerScreenProps } from 'navigation/types';
import { TemperatureLabel } from 'components/ui/temperature-label';
import { PercentageLabel } from 'components/ui/percentage-label';

import { GrowBoxDataRow } from './grow-box-data-row';
import { GrowBoxDataCell } from './grow-box-data-cell';

export const GrowBoxDataTable = () => {
  const { t } = useTranslation();
  const navigation =
    useNavigation<HomeDrawerScreenProps<'Home'>['navigation']>();
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
    setSnackbarText(t('sensor_error') as string);
    showSnackbar();
  };

  const onLevelProblemPress = (
    label: string,
    min?: number,
    max?: number,
    neutralTranslation?: boolean
  ) => {
    if (typeof min !== 'number' && typeof max !== 'number') return;

    const translationType = neutralTranslation ? 'neutral' : 'default';
    hideSnackbar();
    setSnackbarText(
      t(`sensor_level_range_validation.${translationType}`, {
        label,
        min,
        max,
      }) as string
    );
    showSnackbar();
  };

  if (isLoading) return <ActivityIndicator />;

  if (isDeviceLogsError) {
    return <Text>{t('fetching_device_logs_error')}</Text>;
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
            label={t('temperature')}
            LabelParent={TemperatureLabel}
            value={temp}
            onPress={() =>
              navigation.navigate('Stats', {
                typeOfSensor: 'avg_temp',
              })
            }
            onLevelProblemPress={onLevelProblemPress}
            onSensorProblemPress={onSensorProblemPress}
            minValue={assignedPlant?.temp_min}
            maxValue={assignedPlant?.temp_max}
          />
          <GrowBoxDataCell
            label={t('soil_humidity')}
            LabelParent={PercentageLabel}
            value={soil_hum}
            onPress={() =>
              navigation.navigate('Stats', {
                typeOfSensor: 'avg_soil_hum',
              })
            }
            onLevelProblemPress={onLevelProblemPress}
            onSensorProblemPress={onSensorProblemPress}
            minValue={assignedPlant?.soil_humidity_min}
            maxValue={assignedPlant?.soil_humidity_max}
          />
        </GrowBoxDataRow>
        <GrowBoxDataRow>
          <GrowBoxDataCell
            label={t('air_humidity')}
            LabelParent={PercentageLabel}
            value={air_hum}
            onPress={() =>
              navigation.navigate('Stats', {
                typeOfSensor: 'avg_air_hum',
              })
            }
            onLevelProblemPress={onLevelProblemPress}
            onSensorProblemPress={onSensorProblemPress}
            minValue={assignedPlant?.air_humidity_min}
            maxValue={assignedPlant?.air_humidity_max}
          />
          <GrowBoxDataCell
            label={t('light')}
            LabelParent={PercentageLabel}
            value={light}
            onPress={() =>
              navigation.navigate('Stats', {
                typeOfSensor: 'avg_light',
              })
            }
            onSensorProblemPress={onSensorProblemPress}
            onLevelProblemPress={(label, min, max) =>
              onLevelProblemPress(label, min, max, true)
            }
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
            label: t('close'),
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
