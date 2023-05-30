import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Portal, Snackbar } from 'react-native-paper';

import { BackendDeviceLog } from 'schemas/devices';
import { BackendPlant } from 'schemas/plants';

import { GrowBoxPlantSelector } from './GrowBoxPlantSelector';
import { GrowBoxDataRow } from './GrowBoxDataRow';
import { GrowBoxDataCell } from './GrowBoxDataCell';

interface GrowBoxDataTableProps {
  deviceLog: BackendDeviceLog;
  activePlant?: BackendPlant;
}

export const GrowBoxDataTable = ({
  deviceLog,
  activePlant,
}: GrowBoxDataTableProps) => {
  const [visible, setVisible] = React.useState(false);
  const [snackbarText, setSnackbarText] = React.useState('');
  const { soil_hum, air_hum, temp, light } = deviceLog;

  const showSnackbar = () => setVisible(true);

  const hideSnackbar = () => setVisible(false);

  const onErrorIconClick = (label: string, min?: number, max?: number) => {
    if (typeof min !== 'number' && typeof max !== 'number') return;

    hideSnackbar();
    setSnackbarText(`${label} level should be between ${min} and ${max}`);
    showSnackbar();
  };

  return (
    <>
      <View style={styles.dataContainer}>
        <GrowBoxPlantSelector style={styles.dataRow} />
        <GrowBoxDataRow>
          <GrowBoxDataCell
            label="Temperature"
            value={temp}
            onErrorIconClick={onErrorIconClick}
            minValue={activePlant?.temp_min}
            maxValue={activePlant?.temp_max}
          />
          <GrowBoxDataCell
            label="Soil humidity"
            value={soil_hum}
            onErrorIconClick={onErrorIconClick}
            minValue={activePlant?.soil_humidity_min}
            maxValue={activePlant?.soil_humidity_max}
          />
        </GrowBoxDataRow>
        <GrowBoxDataRow>
          <GrowBoxDataCell
            label="Air humidity"
            value={air_hum}
            onErrorIconClick={onErrorIconClick}
            minValue={activePlant?.air_humidity_min}
            maxValue={activePlant?.air_humidity_max}
          />
          <GrowBoxDataCell
            label="Light"
            value={light}
            onErrorIconClick={onErrorIconClick}
            minValue={activePlant?.light_min}
            maxValue={activePlant?.light_max}
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
    marginTop: 20,
  },
  dataRow: {
    marginBottom: 10,
  },
});
