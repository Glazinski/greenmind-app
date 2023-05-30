import React from 'react';
import {
  Text,
  Surface,
  IconButton,
  TouchableRipple,
  useTheme,
} from 'react-native-paper';
import { View, StyleSheet } from 'react-native';

const isValueInRange = (value?: number, min?: number, max?: number) =>
  typeof value === 'number' &&
  typeof min === 'number' &&
  typeof max === 'number' &&
  value > min &&
  value < max;

interface GrowBoxDataCellProps {
  label: string;
  value: number;
  onErrorIconClick: (label: string, min?: number, max?: number) => void;
  minValue?: number;
  maxValue?: number;
}

export const GrowBoxDataCell = ({
  label,
  value,
  onErrorIconClick,
  minValue,
  maxValue,
}: GrowBoxDataCellProps) => {
  const {
    colors: { secondary, errorContainer, error, secondaryContainer },
  } = useTheme();
  const isLevelIncorrect = !isValueInRange(value, minValue, maxValue);

  return (
    <TouchableRipple style={styles.touchableContainer} borderless={true}>
      <Surface
        style={[
          styles.container,
          {
            backgroundColor: isLevelIncorrect
              ? errorContainer
              : secondaryContainer,
          },
        ]}
        mode="flat"
      >
        <View style={styles.titleContainer}>
          <Text style={{ color: isLevelIncorrect ? error : secondary }}>
            {label}
          </Text>
          {isLevelIncorrect && (
            <IconButton
              icon="information-outline"
              size={20}
              iconColor={isLevelIncorrect ? error : secondary}
              onPress={() => {
                onErrorIconClick(label, minValue, maxValue);
              }}
            />
          )}
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
