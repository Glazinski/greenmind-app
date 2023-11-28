import React from 'react';
import {
  Text,
  Surface,
  IconButton,
  TouchableRipple,
  useTheme,
} from 'react-native-paper';
import { View, StyleSheet } from 'react-native';

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
  value: number;
  onPress: () => void;
  onSensorProblemPress: () => void;
  onLevelProblemPress: (label: string, min?: number, max?: number) => void;
  minValue?: number;
  maxValue?: number;
}

export const GrowBoxDataCell = ({
  label,
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
    <TouchableRipple
      style={styles.touchableContainer}
      borderless={true}
      onPress={onPress}
    >
      <Surface
        style={[
          styles.container,
          {
            backgroundColor: getCellBackgroundColor(),
          },
        ]}
        mode="flat"
      >
        <View style={styles.titleContainer}>
          <Text style={{ color: getLabelColor() }}>{label}</Text>
          {renderIconButton()}
        </View>
        <Text variant="titleMedium">{value}</Text>
      </Surface>
    </TouchableRipple>
  );
};

const styles = StyleSheet.create({
  touchableContainer: {
    flex: 1,
    borderRadius: 12,
  },
  container: {
    padding: 10,
    paddingRight: 0,
  },
  titleContainer: {
    height: 25,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});
