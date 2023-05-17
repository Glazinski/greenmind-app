import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useTheme, FAB } from 'react-native-paper';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

import { PlantList } from 'components/Plant/PlantList';

export const Plants = ({ navigation }: NativeStackScreenProps<any, any>) => {
  const {
    colors: { background },
  } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: background }]}>
      <PlantList />
      <FAB
        icon="plus"
        style={styles.fab}
        onPress={() => navigation.navigate('AddPlant')}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  fab: {
    position: 'absolute',
    marginRight: 16,
    marginBottom: 40,
    right: 0,
    bottom: 0,
  },
});
