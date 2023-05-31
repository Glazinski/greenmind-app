import { FlatList, StyleSheet } from 'react-native';
import { ActivityIndicator, Text } from 'react-native-paper';
import { useTranslation } from 'react-i18next';

import { BackendPlant } from 'schemas/plants';

import { PlantItem } from './PlantItem';
import { Layout } from '../Layout';

interface PlantListProps {
  plants: BackendPlant[] | undefined;
  isLoading: boolean;
  isError: boolean;
}

export const PlantList = ({ plants, isError, isLoading }: PlantListProps) => {
  const { t } = useTranslation();

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
      style={styles.listContainer}
      data={plants}
      renderItem={({ item }) => <PlantItem plant={item} />}
      keyExtractor={({ id }) => id.toString()}
      showsVerticalScrollIndicator={false}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  listContainer: {
    paddingHorizontal: 16,
  },
});
