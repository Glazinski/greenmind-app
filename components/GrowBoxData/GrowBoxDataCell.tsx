import * as React from 'react';
import {
  Text,
  Surface,
  Divider,
  TouchableRipple,
  useTheme,
} from 'react-native-paper';
import { View, StyleSheet } from 'react-native';

interface GrowBoxDataCellProps {
  label: string;
  value: number;
}

export const GrowBoxDataCell = ({ label, value }: GrowBoxDataCellProps) => {
  const {
    colors: { secondary },
  } = useTheme();
  return (
    <TouchableRipple
      style={styles.touchableContainer}
      onPress={() => {}}
      borderless={true}
    >
      <Surface style={styles.container} mode="flat">
        <View style={styles.titleContainer}>
          <Text style={{ color: secondary }}>{label}</Text>
        </View>
        <Divider />
        <Text variant="titleMedium">{value}</Text>
      </Surface>
    </TouchableRipple>
  );
};

const styles = StyleSheet.create({
  touchableContainer: {
    borderRadius: 15,
    flex: 1,
  },
  container: {
    padding: 10,
  },
  titleContainer: {
    height: 25,
  },
});
