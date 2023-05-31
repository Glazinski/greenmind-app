import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Divider } from 'react-native-paper';

interface PlantDetailsInfoSectionProps extends React.PropsWithChildren {
  title: string;
  showDivider?: boolean;
}

export const PlantDetailsInfoSection = ({
  children,
  title,
  showDivider,
}: PlantDetailsInfoSectionProps) => (
  <View style={styles.contentContainer}>
    <Text variant="titleLarge">{title}</Text>
    {children}
    {showDivider && <Divider style={styles.divider} />}
  </View>
);

const styles = StyleSheet.create({
  contentContainer: {
    paddingHorizontal: 12,
    marginVertical: 4,
  },
  divider: {
    marginTop: 4,
  },
});
