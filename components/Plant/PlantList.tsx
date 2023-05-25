import React from 'react';
import { View, StyleSheet } from 'react-native';
import { ActivityIndicator, Text } from 'react-native-paper';

import { usePrivatePlants } from 'services/plants/queries';
import { PlantItem } from './PlantItem';

export const PlantList = () => {
  const { data: privatePlants, isLoading, isError } = usePrivatePlants();

  if (isLoading) return <ActivityIndicator />;

  if (isError) return <Text>Something went wrong</Text>;

  if (!privatePlants?.length) {
    return (
      <View style={styles.container}>
        <Text>No plants found</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {privatePlants?.map((privatePlant) => (
        <PlantItem key={privatePlant.id} plant={privatePlant} />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
  },
});
