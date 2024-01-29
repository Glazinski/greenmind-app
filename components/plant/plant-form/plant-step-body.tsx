import React from 'react';
import { View } from 'react-native';

interface PlantStepBodyProps {
  children: React.ReactNode;
}

export function PlantStepBody({ children }: PlantStepBodyProps) {
  return <View>{children}</View>;
}
