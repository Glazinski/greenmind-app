import React from 'react';
import { StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';

interface PlantStepTitleProps {
  children: React.ReactNode;
}

export function PlantStepTitle({ children }: PlantStepTitleProps) {
  return (
    <Text style={styles.title} variant="headlineMedium">
      {children}
    </Text>
  );
}

const styles = StyleSheet.create({
  title: {
    marginBottom: 16,
  },
});
