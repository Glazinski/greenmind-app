import React from 'react';
import { FlatList, RefreshControl, StyleSheet } from 'react-native';
import { ActivityIndicator, Text } from 'react-native-paper';
import { useTranslation } from 'react-i18next';

import { BackendPlant } from 'schemas/plants';

import { PlantItem } from './plant-item';
import { Layout } from '../layout';

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

  if (isError) {
    return (
      <Layout style={styles.container}>
        <Text>{t('something_went_wrong')}</Text>
      </Layout>
    );
  }

  if (!plants?.length) {
    return (
      <Layout style={styles.container}>
        <Text>{t('no_plants_found')}</Text>
      </Layout>
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
