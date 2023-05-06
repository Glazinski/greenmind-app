import { Text, useTheme } from 'react-native-paper';
import { View } from 'react-native';
import * as React from 'react';

interface GrowBoxDataCellProps {
  label: string;
  value: number;
}

export const GrowBoxDataCell = ({ label, value }: GrowBoxDataCellProps) => {
  const {
    colors: { secondary },
  } = useTheme();
  return (
    <View style={{ width: '25%' }}>
      <Text style={{ color: secondary }}>{label}</Text>
      <Text variant="titleMedium">{value}</Text>
    </View>
  );
};
