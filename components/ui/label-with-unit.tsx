import React from 'react';
import { Text } from 'react-native-paper';
import type { TextProps } from 'react-native-paper';

export interface LabelProps extends TextProps<any> {
  children: React.ReactNode;
}

interface LabelWithUnitProps extends LabelProps {
  unit: React.ReactNode;
}

export function LabelWithUnit({ children, unit, ...rest }: LabelWithUnitProps) {
  return (
    <Text {...rest}>
      {children} {unit}
    </Text>
  );
}
