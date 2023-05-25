import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useTheme, FAB } from 'react-native-paper';

import { PlantList } from 'components/Plant/PlantList';
import { Layout } from 'components/Layout';
import { HomeDrawerScreenProps } from 'navigation/types';

export const PlantsScreen = ({
  navigation,
}: HomeDrawerScreenProps<'Plants'>) => {
  const {
    colors: { background },
  } = useTheme();

  return (
    <Layout>
      <PlantList />
      <FAB
        icon="plus"
        style={styles.fab}
        onPress={() =>
          navigation.navigate('PlantWizard', {
            screen: 'PlantStep1',
            params: {
              type: 'add',
            },
          })
        }
      />
    </Layout>
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
