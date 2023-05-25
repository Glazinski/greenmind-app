import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useTheme, FAB } from 'react-native-paper';

import { PlantList } from 'components/Plant/PlantList';
import { HomeDrawerScreenProps } from 'navigation/types';

export const Plants = ({ navigation }: HomeDrawerScreenProps<'Plants'>) => {
  const {
    colors: { background },
  } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: background }]}>
      <PlantList />
      <FAB
        icon="plus"
        style={styles.fab}
        // onPress={() => navigation.navigate('AddPlant')}
        onPress={() =>
          navigation.navigate('PlantWizard', {
            screen: 'PlantStep1',
            params: {
              type: 'add',
            },
          })
        }
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
