import React from 'react';
import { Text, Surface, IconButton, useTheme } from 'react-native-paper';
import { View, StyleSheet } from 'react-native';

import { PercentageLabel } from 'components/ui/percentage-label';
import { TemperatureLabel } from 'components/ui/temperature-label';

const isValueInRange = (value?: number, min?: number, max?: number) => {
  if (
    typeof value === 'number' &&
    typeof min === 'number' &&
    typeof max === 'number'
  ) {
    return value >= min && value <= max;
  }

  return true;
};

interface GrowBoxDataCellProps {
  label: string;
  LabelParent: typeof PercentageLabel | typeof TemperatureLabel;
  value: number;
  onPress: () => void;
  onSensorProblemPress: () => void;
  onLevelProblemPress: (label: string, min?: number, max?: number) => void;
  minValue?: number;
  maxValue?: number;
}

export const GrowBoxDataCell = ({
  label,
  LabelParent,
  value,
  onPress,
  onLevelProblemPress,
  onSensorProblemPress,
  minValue,
  maxValue,
}: GrowBoxDataCellProps) => {
  const {
    colors: { secondary, errorContainer, error, onError, secondaryContainer },
  } = useTheme();
  const isSensorBrokenOrDisconnected = value === -1;
  const isLevelIncorrect = !isValueInRange(value, minValue, maxValue);

  const getCellBackgroundColor = () => {
    if (isSensorBrokenOrDisconnected) {
      return error;
    }

    return isLevelIncorrect ? errorContainer : secondaryContainer;
  };

  const getLabelColor = () => {
    if (isSensorBrokenOrDisconnected) {
      return onError;
    }

    return isLevelIncorrect ? error : secondary;
  };

  const renderIconButton = () => {
    if (isSensorBrokenOrDisconnected) {
      return (
        <IconButton
          icon="information-outline"
          size={20}
          iconColor={onError}
          onPress={onSensorProblemPress}
        />
      );
    }

    if (isLevelIncorrect) {
      return (
        <IconButton
          icon="information-outline"
          size={20}
          iconColor={error}
          onPress={() => {
            onLevelProblemPress(label, minValue, maxValue);
          }}
        />
      );
    }

    return null;
  };

  return (
    <Surface
      style={[
        styles.container,
        {
          backgroundColor: getCellBackgroundColor(),
        },
      ]}
      mode="flat"
    >
      <View style={styles.dataContainer}>
        <LabelParent style={{ color: getLabelColor() }}>{label}</LabelParent>
        <Text variant="titleMedium">{value}</Text>
      </View>
      <View>
        {renderIconButton()}
        <IconButton
          style={styles.statsIcon}
          icon="chart-bar"
          size={20}
          onPress={onPress}
        />
      </View>
    </Surface>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderRadius: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  dataContainer: {
    padding: 10,
    width: '75%',
    justifyContent: 'space-between',
  },
  statsIcon: {
    marginTop: 'auto',
  },
});
