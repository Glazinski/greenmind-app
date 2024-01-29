import React from 'react';
import { FlatList, RefreshControl, ScrollView, StyleSheet } from 'react-native';
import { ActivityIndicator, Text } from 'react-native-paper';
import { useTranslation } from 'react-i18next';

import { BackendPlant } from 'schemas/plants';

import { PlantItem } from './plant-item';

interface PlantListProps {
  plants: BackendPlant[] | undefined;
  isLoading: boolean;
  isError: boolean;
  refetch: () => Promise<unknown>;
}

export const PlantList = ({
  plants,
  isError,
  isLoading,
  refetch,
}: PlantListProps) => {
  const { t } = useTranslation();
  const [refreshing, setRefreshing] = React.useState(false);

  const handlePlantsRefresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  };

  if (isLoading) return <ActivityIndicator />;

  let message = '';

  if (isError) {
    message = t('something_went_wrong');
  } else if (!plants?.length) {
    message = t('no_plants_found');
  }

  if (message.length) {
    return (
      <ScrollView
        style={styles.container}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={handlePlantsRefresh}
          />
        }
      >
        <Text>{message}</Text>
      </ScrollView>
    );
  }

  return (
    <FlatList
      contentContainerStyle={styles.listContainer}
      data={plants}
      renderItem={({ item }) => <PlantItem plant={item} />}
      keyExtractor={({ id }) => id.toString()}
      showsVerticalScrollIndicator={false}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={handlePlantsRefresh}
        />
      }
    />
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  listContainer: {
    paddingHorizontal: 8,
    paddingBottom: 8,
  },
});
